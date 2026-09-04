import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("innereye");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "employee",
                input: false,
            },

            empId: {
                type: "string",
                required: true,
            },

            department: {
                type: "string",
                required: true,
            },

            annualLeaveQuota: {
                type: "number",
                required: true,
                defaultValue: 18,
            },

            annualLeaveUsed: {
                type: "number",
                required: true,
                defaultValue: 0,
            },
        },
    },

    emailAndPassword: {
        enabled: true,
    },
});