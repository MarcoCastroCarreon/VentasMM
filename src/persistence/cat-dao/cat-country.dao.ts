import CatCountry from "../entitites/cat-country.entity";



export default class CatCountryDAO{

    static async getCountryById(id: number): Promise<CatCountry>{
        const country = await CatCountry.getCountryById(id);
        return country;
    }
}