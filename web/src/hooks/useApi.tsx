import React, {useContext} from "react"
import {Container} from "../types/Container";
import axios, {AxiosInstance} from 'axios';
import {Datapoint} from "../types/Datapoint";

interface API {
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    getAllContainers: () => Promise<Container[]>;
    createContainer: (container: Container) => Promise<Container>;
    getAllDatapoints: (containerName: string) => Promise<Datapoint[]>;
}

class RestAPI implements API {
    private restClient: AxiosInstance;
    private username: string | undefined;
    private password: string | undefined;
    private bearerToken: string | undefined;

    constructor(private baseUrl: string) {
        this.restClient = axios.create({
            baseURL: baseUrl,
        });
    }

    error: (details: any) => Promise<any> = (details: any) => {
        console.error(details);
        return Promise.reject(details);
    };

    async doGet<ReturnType>(endpoint: string): Promise<ReturnType> {
        console.debug('calling GET @ ' + endpoint)
        try {
            const response = await this.restClient.get<ReturnType>(endpoint, {
                headers: {
                    Authorization: `Bearer ${this.bearerToken}`,
                },
            });

            // retry once with a new bearer token
            if (response.status === 401) {
                console.debug('authentication error! retrying...')
                try {
                    await this.login(this.username, this.password);
                } catch (e) {
                    console.error(e);
                    return Promise.reject(e);
                }
            }

            if (response.status !== 200) {
                return this.error(
                    `GET call for resource ${endpoint} return status ${response.status}`,
                );
            }
            return Promise.resolve(response.data);
        } catch (e) {
            console.debug('oh no!')
            return this.error(e);
        }
    }

    async doPost<ReturnType>(
        endpoint: string,
        request: any,
    ): Promise<ReturnType> {
        try {
            const response = await this.restClient.post<ReturnType>(
                endpoint,
                request,
                {
                    headers: {
                        Authorization: `Bearer ${this.bearerToken}`,
                    },
                },
            );

            // retry once with a new bearer token
            if (response.status === 401) {
                try {
                    await this.login(this.username, this.password);
                } catch (e) {
                    return this.error(e);
                }
            }

            if (response.status !== 201) {
                return this.error(
                    `GET call for resource ${endpoint} return status ${response.status}`,
                );
            }
            return Promise.resolve(response.data);
        } catch (e) {
            return this.error(e);
        }
    }

    login: (username?: string, password?: string) => Promise<void> = async (
        username?: string,
        password?: string,
    ) => {
        console.error(
            `attempting login with username ${username} and password ${password}`,
        );
        this.username = username;
        this.password = password;

        try {
            console.debug('requesting new bearer token from API');
            this.bearerToken = await this.getBearerToken();

            console.debug(`bearer token received: ${this.bearerToken}`);
            return Promise.resolve();
        } catch (e) {
            //log.debug(`error during login procedure: ${e}`);
            this.bearerToken = '';
            return Promise.reject(e);
        }
    };

    logout: () => Promise<void> = async () => {
        this.username = undefined;
        this.password = undefined;
        this.bearerToken = undefined;
        return Promise.resolve();
    }

    getBearerToken: () => Promise<string> = async () => {
        console.debug('generating new bearer token');
        if (!this.username || !this.password) {
            console.debug('username or password was not set!');
            return Promise.reject();
        }

        try {
            const response = await this.restClient.get<string>('/user/token', {
                auth: {
                    username: this.username,
                    password: this.password,
                },
            });

            if (response.status !== 200) {
                return this.error(`User token resource returned ${response.status}`);
            }

            return Promise.resolve(response.data);
        } catch (e) {
            return this.error(e);
        }
    };

    getAllContainers: () => Promise<Container[]> = () =>
        this.doGet<Container[]>('/container');

    createContainer: (container: Container) => Promise<Container> = (container) =>
        this.doPost<Container>(
            '/container',
            container
        )

    getAllDatapoints: (container: string) => Promise<Datapoint[]> = (container) =>
        this.doGet<Datapoint[]>(`/container/${container}`)
}


const apiContext = React.createContext<API>(
    new RestAPI('')
)

const useApi = () => useContext<API>(apiContext)

export default useApi;
