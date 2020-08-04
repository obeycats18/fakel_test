export type DataTab1 = {
    projectId: number,
    title: string,
    description: string,
    authorId: number,
    phone: string
}

export type DataTab2 = {
    id: number,
    firstName: string,
    lastName: string,
    email: number,
    phone: string,
    adress: DataAdress
}

export type DataAdress = {
    city: string,
    state: string,
    streetAddress: string,
    zip: string
}