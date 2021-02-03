import React, { useEffect, useContext } from 'react'
import { Context } from '../../Context/Context'

import Text from '../Atoms/Text'
import SaveBox from '../Molecules/SaveBox'
import CardAdded from '../Molecules/CardAdded'

const ExtenActivated = () => {
    const context = useContext(Context)
    /* const addPicture =  */ useEffect(() => {
        let images = []
        const saveImages = async () => {
            for (let i = 0; i < window.localStorage.length; i++) {
                images = [...images, JSON.parse(window.localStorage.getItem(i))]
            }
        }
        const saveToContext = async () => {
            context.browserPictures.length !== images.length &&
                context.setBrowserPictures(images)
        }
        saveImages().then(saveToContext())
    }, [context.browserPictures])
    const showEvent = (index) => {
        !context.picturesToSave.includes(context.browserPictures[index]) &&
            context.setPicturesToSave([
                ...context.picturesToSave,
                context.browserPictures[index],
            ])
    }
    return (
        <div>
            <div className="flex flex-row m-small space-x-5">
                <img src="icon.png" alt="logo"></img>
                <Text
                    text="Add one more images to your Mood Boards"
                    color="primary"
                    fontWeight="normal"
                    textSize="large"
                />
            </div>

            <div className="p-small flex flex-wrap w-auto  h-full space-x-5 ">
                {context.browserPictures.length > 0 &&
                    context.browserPictures.map((picture, index) => (
                        <div className="h-1/6 w-auto">
                            <CardAdded
                                height="full"
                                width="auto"
                                borderRadius="small"
                                filename={picture.filename}
                                key={index}
                                url={picture.src}
                                action={()=> showEvent(index) }
                            />
                        </div>
                    ))}
            </div>
            <div className="flex justify-center">
                <div className="fixed bottom-0 h-1/5 w-11/12 ">
                    <SaveBox />
                </div>
            </div>
        </div>
    )
}

export default ExtenActivated