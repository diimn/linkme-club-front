import * as React from "react";
import { Admin, Resource } from 'react-admin';
// import simpleRestProvider from 'ra-data-simple-rest';
import {HOST, WEB_URL, WEB_URL_API} from '../../consts'
import { AdvList, AdvEdit, AdvCreate, AdvIcon } from './Posts';
import dataProvider from './CustomDataProvider'


export default function AdminPage() {

    return (
        <Admin dataProvider={dataProvider(HOST)}>
            <Resource name="adv" list={AdvList} edit={AdvEdit} create={AdvCreate} icon={AdvIcon}/>
        </Admin>
    );
}