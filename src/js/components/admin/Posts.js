import React, {useEffect, useState} from 'react';
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
    ImageInput,
    ImageField,
    useRedirect,
    useNotify,
} from 'react-admin';
import axios from 'axios'

import BookIcon from '@material-ui/icons/Book';
import {host_images} from "../../consts";


export const AdvIcon = BookIcon;

export const AdvList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="url"/>
            <DateField source="creatingDate"/>
            <EditButton basePath="/adv"/>
        </Datagrid>
    </List>
);

const AdvTitle = ({record}) => {
    return <span>Adv {record ? `"${record.title}"` : ''}</span>;
};


export const AdvEdit = (props) => {

    // const [data, setData] = useState({ hits: [] });
    const reqAddr = host_images + '/test'
    console.log("props:")
    console.log(props)
    const getResponse = async () => {
        const response = await axios(reqAddr);
            console.log("Edit axios");
            console.log(response);

    };
    useEffect( () => {
        getResponse();


        // setData(result.data);
    });

    const val = {
        // headPhoto: {
        //     src: 'https://st2.depositphotos.com/1273995/7196/i/950/depositphotos_71962361-stock-photo-hands-in-shape-of-love.jpg',
        //     title: 'Hello world!',
        // },
        // slider1: [
        //     {
        //         src: 'https://st2.depositphotos.com/1273995/7196/i/950/depositphotos_71962361-stock-photo-hands-in-shape-of-love.jpg',
        //         title: 'Hello world!',
        //     },
        //     {
        //         src: 'https://st2.depositphotos.com/1273995/7196/i/950/depositphotos_71962361-stock-photo-hands-in-shape-of-love.jpg',
        //         title: 'Hello world!',
        //     },
        // ]
    }
    return (
        <Edit undoable={false} title={<AdvTitle/>} {...props}>
            {redactor(val)}
        </Edit>
    );
}


export const AdvCreate = (props) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = ({data}) => {
        notify(`Объявление сохранено`)
        redirect('/');
    };
    return (
        <Create onSuccess={onSuccess} title="Create a Post" {...props}>
            {redactor()}
        </Create>
    );
}


function redactor2(val) {
    return (
        <SimpleForm initialValues={val}>
            <ImageInput source="image">
                <ImageField source="url" title="title"/>
            </ImageInput>
        </SimpleForm>


    )

}

function redactor(val) {

    return (
        <SimpleForm initialValues={val}>
            <ImageInput source="headPhoto"
                        label="Загрузка изображений для шапки"
                        accept="image/*"
                        labelSingle="Перетащите фотографию или выберите для загрузки"
            >
                <ImageField source="src" title="title"/>
            </ImageInput>
            <TextInput source="url" label="URL" helperText=""/>
            <TextInput source="advContent.headTop" label="Заголовок" fullWidth={true}/>
            <TextInput source="advContent.price" label="Цена"/>
            <TextInput source="advContent.bonus" label="Бонус"/>
            {/*Меню загрузки картинки шапки*/}
            {/*<Dropzone title="Загрузка изображений слайдера 1" slider_id="1"/>*/}
            <ImageInput source="slider1" label="Загрузка изображений слайдера 1" accept="image/*"
                        multiple="true"
                        labelMultiple="Перетащите фотографии или выберите для загрузки">
                <ImageField source="src" title="title"/>
            </ImageInput>
            <TextInput source="advContent.slider1_comments" label="Комментарии к слайдеру 1" fullWidth={true}/>
            <TextInput source="advContent.price_comment" label="Комментарий к цене" fullWidth={true}/>
            <TextInput source="advContent.descHead" label="Комментарий к заголовку" fullWidth={true}/>
            <TextInput multiline source="advContent.description" label="Описание " fullWidth={true}/>
            <ImageInput source="slider2" label="Загрузка изображений слайдера 2" accept="image/*"
                        multiple="true"
                        labelMultiple="Перетащите фотографии или выберите для загрузки">
                <ImageField source="src" title="title"/>
            </ImageInput>
            <TextInput source="advContent.bullets" label="Буллеты" fullWidth={true}/>
            <ImageInput source="brokerPhoto" label="Загрузка фото брокера" accept="image/*"
                        labelSingle="Перетащите фотографию или выберите для загрузки">
                <ImageField source="src" title="title"/>
            </ImageInput>
            <TextInput source="advContent.brokerName" label="Имя брокера" fullWidth={true}/>
            <TextInput source="advContent.brokerComment" label="О брокере" fullWidth={true}/>
            {/*<img src={require("../../../img/arrow-right-header-hover.png")} alt="Стрелка"*/}
            {/*     className="header-hover__img"/>*/}

            <TextInput source="advContent.coordinates" label="Координаты"/>
            {/*<TextInput source="teaser" options={{ multiLine: true }} />*/}
            {/*<TextInput multiline source="body" />*/}
            {/*<TextInput label="Publication date" source="published_at" />*/}
            {/*<TextInput source="average_note" />*/}

            <ImageInput source="shareImage"
                        label="Загрузка изображений для репоста"
                        accept="image/*"
                        labelSingle="Перетащите фотографию или выберите для загрузки"
            >
                <ImageField source="src" title="title"/>
            </ImageInput>
            <TextInput source="advContent.shareText" label="Инфо для репоста" fullWidth={true}/>
        </SimpleForm>
    )
}
