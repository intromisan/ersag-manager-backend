/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { FilterQuery, UpdateQuery } from 'mongoose';
import ISession from '../interfaces/session';
export declare function createSession(userId: string): Promise<import("mongoose").FlattenMaps<Omit<import("mongoose")._LeanDocument<any>, "$getAllSubdocs" | "$ignore" | "$isDefault" | "$isDeleted" | "$getPopulatedDocs" | "$isEmpty" | "$isValid" | "$locals" | "$markValid" | "$model" | "$op" | "$session" | "$set" | "$where" | "baseModelName" | "collection" | "db" | "delete" | "deleteOne" | "depopulate" | "directModifiedPaths" | "equals" | "errors" | "get" | "getChanges" | "increment" | "init" | "invalidate" | "isDirectModified" | "isDirectSelected" | "isInit" | "isModified" | "isNew" | "isSelected" | "markModified" | "modifiedPaths" | "modelName" | "overwrite" | "$parent" | "populate" | "populated" | "remove" | "replaceOne" | "save" | "schema" | "set" | "toJSON" | "toObject" | "unmarkModified" | "update" | "updateOne" | "validate" | "validateSync" | "$isSingleNested">>>;
export declare function findSessions(query: FilterQuery<ISession>): Promise<import("mongoose")._LeanDocument<ISession & {
    _id: any;
}>[]>;
export declare function updateSession(query: FilterQuery<ISession>, update: UpdateQuery<ISession>): Promise<import("mongodb").UpdateResult>;
export declare function reIssueAccessToken({ refreshToken }: {
    refreshToken: string;
}): Promise<string | false>;
