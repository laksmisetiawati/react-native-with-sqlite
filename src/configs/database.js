import React, {Component} from 'react';

const SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase({
                name: 'newdatas.db',
                createFromLocation: '~basesql.db'
            })

export default db;