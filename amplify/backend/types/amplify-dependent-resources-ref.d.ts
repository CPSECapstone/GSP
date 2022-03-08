export type AmplifyDependentResourcesAttributes = {
    "function": {
        "AdminQueries8b479e72": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "AdminQueries": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "minoritymarket": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "mmAuth": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "geo": {
        "SearchMap": {
            "Name": "string",
            "Style": "string",
            "Region": "string",
            "Arn": "string"
        }
    },
    "storage": {
        "s3minoritymarketimagestore": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}