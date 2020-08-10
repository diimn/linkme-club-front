import * as React from "react";
import { Admin, Resource } from 'react-admin';
import {HOST} from '../../consts'
import { AdvList, AdvEdit, AdvCreate, AdvIcon } from './Posts';
import dataProvider from './CustomDataProvider'
import authProvider from './AuthProvider'


export default function AdminPage() {

    return (
        <Admin authProvider={authProvider} dataProvider={dataProvider(HOST)}>
            <Resource name="adv" list={AdvList} edit={AdvEdit} create={AdvCreate} icon={AdvIcon}/>
        </Admin>
    );
}