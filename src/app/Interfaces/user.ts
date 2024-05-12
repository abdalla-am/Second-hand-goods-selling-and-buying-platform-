export interface UserData {
        bio: string;
        email: string;
        favourite_ads: number;
        full_name: string;
        gender: string;
        government: string;
        location: string;
        password: string;
        phone_number: string;
        posted_ads: number;
        sold_ads: number;
        FavoriteList: {
          [key: string]: string; // Assuming keys are strings and values are strings representing ad IDs
        };
}
