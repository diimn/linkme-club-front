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
    ImageField
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import axios from "axios"
import {useDropzone} from 'react-dropzone'
import {HOST} from "../../consts";
import {Toolbar} from "material-ui";

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
    <Edit title={<AdvTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput source="title"/>
            <TextInput source="title"/>
            <TextInput source="title"/>
            <TextInput source="title"/>
            <TextInput source="title"/>
            <TextInput source="title"/>
            <TextInput source="teaser" options={{multiLine: true}}/>
            <TextInput multiline source="body"/>
            <DateInput label="Publication date" source="published_at"/>
            <TextInput source="average_note"/>
            <TextInput disabled label="Nb views" source="views"/>
        </SimpleForm>
    </Edit>
);

export const AdvCreate = (props) => (
    <Create title="Create a Post" {...props}>
        <SimpleForm>
            <ImageInput source="headPhoto" label="Загрузка изображений для шапки" accept="image/*"
                        labelSingle = "Перетащите фотографию или выберите для загрузки">
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
                        labelMultiple = "Перетащите фотографии или выберите для загрузки">
                <ImageField source="src" title="title"/>
            </ImageInput>
            <TextInput source="advContent.price_comment" label="Комментарий к цене"/>
            <TextInput source="advContent.descHead" label="Комментарий к заголовку"/>
            <TextInput multiline source="advContent.description" label="Описание "/>
            <ImageInput source="slider2" label="Загрузка изображений слайдера 2" accept="image/*"
                        multiple="true"
                        labelMultiple = "Перетащите фотографии или выберите для загрузки">
                <ImageField source="src" title="title"/>
            </ImageInput>
            <TextInput source="advContent.bullets" label="Буллеты"/>
            <ImageInput source="brokerPhoto" label="Загрузка фото брокера" accept="image/*"
                        labelSingle = "Перетащите фотографию или выберите для загрузки">
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
    </Create>
);

function Dropzone(props) {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        console.log(file)
        const formData = new FormData();
        formData.append("file", file);
        axios.post(
            // host + `/${userProfileId}/image/upload`,
            HOST + `/image/upload/${props.slider_id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        ).then(() => {
            console.log("Image uploaded successfully");
        }).catch(err => {
            console.log(err)
        });
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {/*<p>Загрузка изображений карусели</p>*/}
            <p>{props.title}</p>
            <p>--------------------</p>
            {
                isDragActive ?
                    <p>Drop the image here ...</p> :
                    <p>Перетащите картинки для загрузки</p>
            }
            <p>--------------------</p>
        </div>
    )
}