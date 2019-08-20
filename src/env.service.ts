import * as dotenv from 'dotenv'
import * as fs from 'fs'

export interface EnvData {
  // application
  APP_ENV: string
  APP_DEBUG: boolean

  // database
  DB_TYPE: 'postgres'
  DB_HOST?: string
  DB_PORT?: number
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_SYNC: boolean

  // Api-key
  AK_Booking: string

  //kayak api
  AK_Kayak: string

  // Numbeo Api-key
  AP_numbeo: string

  //google distance matrix
  AP_google: string

  //auth info
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  JWT_SECRET_KEY: string;
}

export class EnvService {
  private vars: EnvData

  constructor () {
    // const environment = process.env.NODE_ENV || 'development'
    const data: any = dotenv.parse(fs.readFileSync('.env'))

    // data.APP_ENV = environment
    // data.APP_DEBUG = data.APP_DEBUG === 'true' ? true : false
    // data.DB_PORT = parseInt(data.DB_PORT)

    this.vars = data as EnvData
  }

  read (): EnvData {
    return this.vars
  }

  isDev (): boolean {
    return (this.vars.APP_ENV === 'development')
  }

  isProd (): boolean {
    return (this.vars.APP_ENV === 'production')
  }
}