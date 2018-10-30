const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    isEmpty = require('../validation/is-empty'),
    User = require('./User');

//Create schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubUsername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldOfStudy: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },
        facebook: {
            type: String,
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('profile', ProfileSchema);

Profile.getUserProfileById = async id => {
    const userProfile = await Profile.findOne({
        user: id
    })
        .populate('user', ['name', 'avatar']);

    if (!userProfile) return null;

    return userProfile;
};

Profile.getUserProfileByHandle = async handle => {
    const profile = await Profile.findOne({
        handle
    })
        .populate('user', ['name', 'avatar']);

    if (!profile) return null;

    return profile;
};

Profile.getAll = async () => {
    const profiles = await Profile.find()
        .populate('user', ['name', 'avatar']);

    if (isEmpty(profiles)) return null;

    return profiles;
};

Profile.updateProfile = async (id, newData) => {
    return await Profile.findOneAndUpdate({
        user: id
    }, {
        $set: newData
    }, {
        new: true
    });
};

Profile.createNewProfile = async (data) => {
    const returnValue = {
        errors: {},
        profile: null
    };

    const wrongProfile = await Profile.findOne({
        handle: data.handle
    });

    if (wrongProfile) {
        returnValue.errors.handle = 'That handle already exists';
        return returnValue
    }

    let profile = new Profile(data);

    profile = await profile.save();

    returnValue.profile = profile;
    returnValue.errors = null;

    return returnValue

};

Profile.deleteProfile = async user_id => {
    return await Profile.findOneAndRemove({
        user: user_id
    })
};

Profile.deleteProfileAndUser = async user_id => {
    return await Promise.all([
        User.deleteUser(user_id),
        Profile.deleteProfile(user_id)
    ])
};

module.exports = Profile;
