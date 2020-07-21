// in posts.js
// import * as React from "react";
import React, {useState, useEffect, useCallback} from 'react';
import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    DateField,
    TextField,
    EditButton,
    TextInput,
    DateInput,
    ImageInput,
    ImageField,
    CardActions,
    ShowButton
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import axios from "axios"
import {useDropzone} from 'react-dropzone'
import {HOST, host_images} from "../../consts";
import {Toolbar} from "material-ui";
import Button from "@material-ui/core/Button";

export const AdvIcon = BookIcon;

export const AdvList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="url"/>
            <DateField source="creatingDate"/>
            {/*<TextField source="average_note" />*/}
            {/*<TextField source="views" />*/}
            <EditButton basePath="/adv"/>
        </Datagrid>
    </List>
);

const AdvTitle = ({record}) => {
    return <span>Adv {record ? `"${record.title}"` : ''}</span>;
};



export const AdvEdit = (props) => (
    <Edit undoable={false}  title={<AdvTitle/>}  actions={<PostEditActions/>} {...props}>
        {redactor()}
    </Edit>
);


export const AdvCreate = (props) => (
    <Create title="Create a Post" {...props}>
        {redactor()}
    </Create>
);

const PostEditActions = ({basePath, data, resource}) => (
    <CardActions>
        {/*<ShowButton basePath={basePath} record={data}/>*/}
        {/* Add your custom actions */}
        <Button color="primary" onClick={customAction}>Custom Action</Button>
    </CardActions>
);

function customAction() {
    console.log("ACTION")
}

function redactor() {
    return (
        <SimpleForm>
            <ImageInput source="headPhoto" label="Загрузка изображений для шапки" accept="image/*"
                        labelSingle="Перетащите фотографию или выберите для загрузки">
                <ImageField source="src" title="title"/>
            </ImageInput>
            <TextInput source="url" label="URL" helperText=""/>
            <TextInput source="advContent.headTop" label="Заголовок"/>
            <TextInput source="advContent.price" label="Цена"/>
            <TextInput source="advContent.bonus" label="Бонус"/>
            {/*Меню загрузки картинки шапки*/}
            {/*<Dropzone title="Загрузка изображений слайдера 1" slider_id="1"/>*/}
            <ImageInput source="slider1" label="Загрузка изображений слайдера 1" accept="image/*"
                        multiple="true"
                        labelMultiple="Перетащите фотографии или выберите для загрузки">
                <ImageField source="src" title="title"/>
            </ImageInput>
            <TextInput source="advContent.price_comment" label="Комментарий к цене"/>
            <TextInput source="advContent.descHead" label="Комментарий к заголовку"/>
            <TextInput multiline source="advContent.description" label="Описание "/>
            <ImageInput source="slider2" label="Загрузка изображений слайдера 2" accept="image/*"
                        multiple="true"
                        labelMultiple="Перетащите фотографии или выберите для загрузки">
                <ImageField source="src" title="title"/>
            </ImageInput>
            <TextInput source="advContent.bullets" label="Буллеты"/>
            <ImageInput source="brokerPhoto" label="Загрузка фото брокера" accept="image/*"
                        labelSingle="Перетащите фотографию или выберите для загрузки">
                <ImageField source="src" title="title"/>
            </ImageInput>
            <TextInput source="advContent.brokerName" label="Имя брокера"/>
            <TextInput source="advContent.brokerComment" label="О брокере"/>
            {/*<img src={require("../../../img/arrow-right-header-hover.png")} alt="Стрелка"*/}
            {/*     className="header-hover__img"/>*/}

            <TextInput source="advContent.coordinates" label="Координаты"/>
            {/*<TextInput source="teaser" options={{ multiLine: true }} />*/}
            {/*<TextInput multiline source="body" />*/}
            {/*<TextInput label="Publication date" source="published_at" />*/}
            {/*<TextInput source="average_note" />*/}
        </SimpleForm>
    )
}
