import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { BusinessType, Ownership } from './constants/enums';
import { Business, Review, Collection } from './src/models';

/**
 * Creates a new business from scratch with required input values. 
 * Reviews is initialized to empty array, rating is initialized to 0.0.
 * @param name Name of the business
 * @param type The type of Business as an Enum value
 * @param about Description about the business
 * @param phone Phone number of the business
 * @param address Address of the business
 * @param website URL to business website
 * @param tags List of tags to attach to this business
 */
export async function createNewBusiness (
    name: string,
    type: BusinessType,
    about: string,
    phone: string,
    address: string,
    website: string,
    tags: [string],
    primarycolor: string,
    secondarycolor: string,
) {
    await DataStore.save(
        new Business({
            "name": name,
            "about": about,
            "phone": phone,
            "address": address,
            "url":  website,
            "tags": tags,
            "type": type,
            "primarycolor": primarycolor,
            "secondarycolor": secondarycolor,
            "rating": 0.0,
            "Reviews": [],
        })
    );
};

/**
 * Function to query all businesses by name, returning any business which contains the input name.
 * Not for finding a specific business, this function should be used in search queries.
 * @param name Name of the business to be queried.
 * @param partial True to search for all partial matches, False to search for only exact matches.
 * @returns Businesses which contain the name.
 */
export async function getBusinessByPartialName(name: string, partial: boolean) {
    return await DataStore.query(Business, b => b.name(partial ? "contains" : "eq", name));
};

/**
 * Queries 20 highest rated businesses, sorted from high to low. 
 * @returns List of businesses
 */
export async function getForYouBussinesses() {
    return await DataStore.query(Business, b => b.rating("ge", 4.0), {
        sort: b => b.rating(SortDirection.DESCENDING),
        limit: 20
    });
};

export async function getBusinessesByTypeAndOwnership(
    type: BusinessType,
    ownership: [Ownership],
) {
    const businesses = await DataStore.query(Business, b => b.type("eq", type));
}