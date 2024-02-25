export type IUserEntity = {
    uid: string;
    name: string;
    email: string;
    restrictions: IRestrictions,
}

export type IRestrictions = {
    time?: number,
    dayTime?: number,
}

export function getTimeRestriction(user: IUserEntity) {
    return user.restrictions.time;
}

export function getDayTimeRestriction(user: IUserEntity) {
    return user.restrictions.dayTime;
}
