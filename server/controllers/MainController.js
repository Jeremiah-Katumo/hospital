import express from 'express';
import mysql from 'mysql2';
import pluralize from 'pluralize';
import fs from 'fs';
import { hashDecode, singular, plural, getEnumOptions } from '../helpers/utilityHelper.js';
const FeatureLibrary = require('./libs/FeatureLibrary'); // Custom class for navigation
import db, { conn } from '../database/dbConnection.js';

const express = require('express');
const FeatureService = require('../services/FeatureService');
const path = require('path');

export class WebController {
    constructor() {
        this.feature = '';
        this.action = '';
        this.id = 0;
        this.parentId = 0;
        this.session = null;
        this.model = null;
        this.library = null;
        this.tableName = null;
        this.listQueryFields = [];
    }

    async initController(req, res, next) {
        try {
            this.session = req.session;
            this.feature = req.params.feature || 'dashboard';
            this.action = req.params.action || 'list';
            this.id = req.params.id || 0;

            const featureModelPath = `../models/${plural(this.feature)}Model`;
            const featureLibraryPath = `../libraries/${this.feature}Library`;

            // Dynamically load models and libraries if they exist
            try {
                this.model = require(featureModelPath);
            } catch {
                this.model = null;
            }

            try {
                const FeatureLibrary = require(featureLibraryPath);
                this.library = new FeatureLibrary();
                this.listQueryFields = this.library.setListQueryFields();
            } catch {
                this.library = null;
            }

            this.tableName = plural(this.feature);
            next();
        } catch (err) {
            next(err);
        }
    }

    async pageData(data = {}, id = '') {
        const pageData = {
            result: data,
            feature: this.feature,
            action: this.action,
            id: this.id,
            parentId: this.parentId,
            tableName: this.tableName,
        };

        const viewPath = path.join(__dirname, '../views', this.feature, `${this.action}.ejs`);
        pageData.view = require('fs').existsSync(viewPath)
            ? `${this.feature}/${this.action}`
            : `templates/${this.action}`;

        if (this.library) {
            this.listQueryFields.length
                ? (pageData.fields = this.listQueryFields)
                : (pageData.fields = await this.model.getFields(this.tableName));
        }

        return pageData;
    }

    async index(req, res) {
        try {
            if (this.feature !== 'dashboard' && !req.user.canDo(`${this.feature}.read`)) {
                return res.status(403).render('errors/html/error_403');
            }

            const data = this.model ? await this.model.getAll() : [];
            const pageData = await this.pageData(data);

            if (this.library && typeof this.library.listExtraData === 'function') {
                this.library.listExtraData(pageData);
            }

            if (req.xhr) {
                return res.render(`${this.feature}/list`, pageData);
            }

            res.render('index', { pageData });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async view(req, res) {
        try {
            const numericId = hashDecode(req.params.hashedId);
            const data = await this.model.getOne(numericId);
            this.parentId = req.params.hashedId;

            const pageData = await this.pageData(data);

            if (this.library && typeof this.library.viewExtraData === 'function') {
                this.library.viewExtraData(pageData);
            }

            if (req.xhr) {
                return res.render(`${this.feature}/view`, pageData);
            }

            res.render('index', { pageData });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async edit(req, res) {
        try {
            const numericId = hashDecode(this.id);
            const data = await this.model.getOne(numericId);
            const pageData = await this.pageData(data);

            if (this.library && typeof this.library.editExtraData === 'function') {
                this.library.editExtraData(pageData);
            }

            res.render(`${this.feature}/edit`, pageData);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async delete(req, res) {
        try {
            const numericId = hashDecode(req.params.id);
            if (this.model) {
                await this.model.delete(numericId);
            }
            res.redirect(`/${this.feature}`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async add(req, res) {
        try {
            const pageData = await this.pageData();
            if (this.library && typeof this.library.addExtraData === 'function') {
                this.library.addExtraData(pageData);
            }
            res.render(`${this.feature}/add`, pageData);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getBulkActionFields(req, res) {
        try {
            const { tableName, actionOnItem } = req.body;
            if (actionOnItem === 'edit') {
                const fields = await this.model.getFieldsMetadata(tableName);
                const filteredFields = fields.filter(
                    (field) => !['created_at', 'created_by', 'updated_at', 'updated_by'].includes(field.name)
                );

                const bulkFields = filteredFields.map((field) => {
                    if (field.type === 'enum') {
                        field.options = getEnumOptions(tableName, field.name);
                    }
                    return field;
                });

                res.render('templates/bulk_edit', { tableName, bulkFields });
            } else {
                res.status(400).send('Unsupported action');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

