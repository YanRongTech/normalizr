import _ from 'lodash';
import {extend} from 'util-toolkit';

const defObj = {
    entities: {},
    result: []
};

const defSchemaExtra = {
    idKey: 'id'
};

export function normalize(data, schema) {
    if (!schema || !(schema instanceof Schema)) {
        throw new Error('no schema defined');
    }
    let primaryKey = schema.getPKey(),
        refObj = {},
        idKey = schema.getIdKey(),
        defaultKv = schema.getDefaultKv(),
        defaults = schema.getDefaults();
    extend(true, refObj, defObj);
    extend(refObj, defaults);
    refObj.entities[primaryKey] = {};
    let entities = refObj.entities[primaryKey];
    if (!_.isObject(data)) {
        return refObj;
    }
    if (!_.isArray(data)) {
        let tmp = data[primaryKey];
        if (!tmp || !tmp[idKey]) {
            return refObj
        }
        let id = tmp[idKey];
        entities[id] = tmp;
        refObj.result.push(id);
        return refObj;
    }
    data.filter((obj)=> {
        return !!obj[idKey];
    })
        .forEach((obj)=> {
            let id = obj[idKey];
            extend(obj, defaultKv);
            entities[id] = obj;
            refObj.result.push(id);
        });
    return refObj;
}

export class Schema {
    constructor(pkey, extra) {
        this.primaryKey = pkey || '';
        this.config = {
            ...defSchemaExtra,
            ...extra
        };
        if (this.config.defaults && this.config.defaults.entities) {
            throw new Error("It is not allowed add 'entities' in defaults");
        }
    }

    getDefaultKv() {
        return this.config.defaultKv || {};
    }

    getPKey() {
        return this.primaryKey;
    }

    getIdKey() {
        return this.config.idKey;
    }

    getDefaults() {
        return this.config.defaults || {};
    }
}
