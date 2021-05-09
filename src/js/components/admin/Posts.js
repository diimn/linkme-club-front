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
    BooleanInput,
    ImageInput,
    ImageField,
    useRedirect,
    useNotify,
} from 'react-admin';
import axios from 'axios'

import BookIcon from '@material-ui/icons/Book';
import {HOST, host_adv, host_images} from "../../consts";
import * as PropTypes from "prop-types";


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
    console.log("record title")
    console.log(record)
    return <span>Adv {record ? `"${record.url}"` : ''}</span>;
};


export const AdvEdit = (props) => {

    // let advUrl;
    // const [data, setData] = useState({ hits: [] });
    const [countImages, setCountImages] = useState();
    const [advUrl, setAdvUrl] = useState();

    let photos;
    // let countImages;
    console.log("props:")
    console.log(props)


    useEffect(() => {
        const reqAddrUrl = host_adv + "/" + props.id
        console.log("reqAddrUrl: " + reqAddrUrl)
        axios.get(reqAddrUrl).then(value => {
            console.log("request url data: ")
            console.log(value.data)
            setAdvUrl(value.data.url)
            let url = value.data.url;
            const reqAddrImages = host_images + "/getAllNumberSliderPhotos?"
                + "url=" + url
            console.log("reqAddrImages: " + reqAddrImages)
            axios(reqAddrImages).then(value => {
                console.log("Axios countImages")
                setCountImages(value.data)
            })
        })


    }, []);

    console.log("countImages");
    console.log(countImages);
    //получить текущий url + количество фоток на слайдере
    if (countImages) {
        let arrSlider1 = [];
        for (let i = 0; i < countImages.slider1Count; i++) {
            let addr = host_images + `/downloadSliderPhoto?url=${advUrl}&type=slider1&index=${i}`
            arrSlider1[i] = {
                src: addr,
                title: 'slider1 ' + i,
            }
        }

        let arrSlider2 = [];
        for (let i = 0; i < countImages.slider2Count; i++) {
            let addr = host_images + `/downloadSliderPhoto?url=${advUrl}&type=slider2&index=${i}`
            arrSlider2[i] = {
                src: addr,
                title: 'slider1 ' + i,
            }
        }

        photos = {
            headPhoto: {
                src: host_images + `/downloadHeaderPhoto?url=${advUrl}`,
                title: 'headPhoto',
            },
            slider1: arrSlider1,
            slider2: arrSlider2
        }
    }

    return (
        <Edit undoable={false} title={<AdvTitle/>} {...props}>
            {redactor(photos)}
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


function getSliderImageCounts(reqAddr) {
    return axios.get(reqAddr).then((resp) => {
        console.log('count Images')
        return resp.data
    })
}


BooleanInput.propTypes = {
    label: PropTypes.string,
    helperText: PropTypes.string,
    source: PropTypes.string
};

function redactor(val) {

    return (
        <SimpleForm initialValues={val}>
            <ImageInput source="headPhoto"
                        label="Загрузка изображений для шапки"
                        accept="image/*"
                        labelSingle="Перетащите фотографию или выберите для загрузки"
                        fullWidth={false}
            >
                <ImageField source="src"
                            title="title"
                            className="TestNameField"
                            classes={{label: 'my-class-name'}}
                    // className={useImageFieldStyles}
                />
            </ImageInput>
            <TextInput source="url" label="URL" helperText=""/>
            <BooleanInput source="isMainPageActive" label="Появляется на заглавной" helperText=""/>
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
