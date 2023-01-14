import { google } from 'googleapis'
import * as fs from 'fs'
import * as path from 'path'

class GoogleApi{
    CLIENT_ID = process.env.CLIENT_ID
    CLIENT_SECRET = process.env.CLIENT_SECRET
    REDIRECT_URI = process.env.REDIRECT_URI
    REFRESH_TOKEN = process.env.REFRESH_TOKEN
    oauth2CLient: any
    drive: any

    constructor(){
        this.oauth2CLient = new google.auth.OAuth2(this.CLIENT_ID, this.CLIENT_SECRET, this.REDIRECT_URI)
        this.oauth2CLient.setCredentials({
            refresh_token: this.REFRESH_TOKEN,
        })
        this.drive = google.drive({
            version: 'v3', 
            auth: this.oauth2CLient
        })
    }

    async uploadFile() {
        try{
            const createFile = await this.drive.files.create({
                requestBody: {
                    name: 'thobo.jpg',
                    mimeType: 'image/jpg'
                },
                media: {
                    mimeType: 'image/jpg',
                    body: fs.createReadStream(path.join(__dirname, './cr7.jpeg'))
                }
            })
            console.log(createFile.data)
        }catch(err){
            console.log(err)
        }
    }
}

export default GoogleApi