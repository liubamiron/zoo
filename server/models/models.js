
const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Animal = sequelize.define('animal', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

    // Names in multiple languages
    name_ru: {type: DataTypes.STRING, allowNull: true}, // Russian name
    name_ro: {type: DataTypes.STRING, allowNull: true}, // Romanian name
    name_en: {type: DataTypes.STRING, allowNull: true}, // English name

    // Short description in multiple languages
    descr_short_ru: {type: DataTypes.TEXT, allowNull: true},
    descr_short_ro: {type: DataTypes.TEXT, allowNull: true},
    descr_short_en: {type: DataTypes.TEXT, allowNull: true},

    // Long description in multiple languages
    descr_long_ru: {type: DataTypes.TEXT, allowNull: true},
    descr_long_ro: {type: DataTypes.TEXT, allowNull: true},
    descr_long_en: {type: DataTypes.TEXT, allowNull: true},

    // Habitat in multiple languages
    habitat_ru: {type: DataTypes.TEXT, allowNull: true},
    habitat_ro: {type: DataTypes.TEXT, allowNull: true},
    habitat_en: {type: DataTypes.TEXT, allowNull: true},

    // General info in multiple languages
    general_info_ru: {type: DataTypes.TEXT, allowNull: true},
    general_info_ro: {type: DataTypes.TEXT, allowNull: true},
    general_info_en: {type: DataTypes.TEXT, allowNull: true},

    // Nutrition in multiple languages
    nutrition_ru: {type: DataTypes.TEXT, allowNull: true},
    nutrition_ro: {type: DataTypes.TEXT, allowNull: true},
    nutrition_en: {type: DataTypes.TEXT, allowNull: true},

    // Protection in multiple languages
    protection_ru: {type: DataTypes.TEXT, allowNull: true},
    protection_ro: {type: DataTypes.TEXT, allowNull: true},
    protection_en: {type: DataTypes.TEXT, allowNull: true},

    // Facts in multiple languages
    facts_ru: {type: DataTypes.TEXT, allowNull: true},
    facts_ro: {type: DataTypes.TEXT, allowNull: true},
    facts_en: {type: DataTypes.TEXT, allowNull: true},

    // Family in multiple languages
    family_ru: {type: DataTypes.TEXT, allowNull: true},
    family_ro: {type: DataTypes.TEXT, allowNull: true},
    family_en: {type: DataTypes.TEXT, allowNull: true},

    // Genus in multiple languages
    genus_ru: {type: DataTypes.TEXT, allowNull: true},
    genus_ro: {type: DataTypes.TEXT, allowNull: true},
    genus_en: {type: DataTypes.TEXT, allowNull: true},

    // Phylum in multiple languages
    phylum_ru: {type: DataTypes.TEXT, allowNull: true},
    phylum_ro: {type: DataTypes.TEXT, allowNull: true},
    phylum_en: {type: DataTypes.TEXT, allowNull: true},

    // Class in multiple languages
    clas_ru: {type: DataTypes.TEXT, allowNull: true},
    clas_ro: {type: DataTypes.TEXT, allowNull: true},
    clas_en: {type: DataTypes.TEXT, allowNull: true},

    // Domain in multiple languages
    domain_ru: {type: DataTypes.STRING, allowNull: true},
    domain_ro: {type: DataTypes.STRING, allowNull: true},
    domain_en: {type: DataTypes.STRING, allowNull: true},

    // Karyotype in multiple languages
    karyotype_ru: {type: DataTypes.STRING, allowNull: true},
    karyotype_ro: {type: DataTypes.STRING, allowNull: true},
    karyotype_en: {type: DataTypes.STRING, allowNull: true},

    // Long habitat description in multiple languages
    habitat_long_ru: {type: DataTypes.TEXT, allowNull: true},
    habitat_long_ro: {type: DataTypes.TEXT, allowNull: true},
    habitat_long_en: {type: DataTypes.TEXT, allowNull: true},

    // Non-translatable fields
    new_animal: {type: DataTypes.BOOLEAN, defaultValue: false},
    disappearing: {type: DataTypes.BOOLEAN, defaultValue: false},

    // Images
    img_1: {type: DataTypes.STRING, allowNull: true},
    img_2: {type: DataTypes.STRING, allowNull: true},
    img_3: {type: DataTypes.STRING, allowNull: true},
    img_4: {type: DataTypes.STRING, allowNull: true},

    conservation_ru: {type: DataTypes.TEXT, allowNull: true},
    conservation_ro: {type: DataTypes.TEXT, allowNull: true},
    conservation_en: {type: DataTypes.TEXT, allowNull: true},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

    // Name in multiple languages
    name_ru: {type: DataTypes.STRING, unique: true, allowNull: true}, // Russian name
    name_ro: {type: DataTypes.STRING, unique: true, allowNull: true}, // Romanian name
    name_en: {type: DataTypes.STRING, unique: true, allowNull: true}, // English name
})

const Tender = sequelize.define('tender', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // Title in multiple languages
    title_ru: {type: DataTypes.STRING, allowNull: true},  // Russian title
    title_ro: {type: DataTypes.STRING, allowNull: true},  // Romanian title
    title_en: {type: DataTypes.STRING, allowNull: true},  // English title

    // Description in multiple languages
    description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian description
    description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian description
    description_en: {type: DataTypes.TEXT, allowNull: true},  // English description
    pdf_file: {type: DataTypes.STRING},
    typeTenderId: DataTypes.INTEGER
})

const TypeTender = sequelize.define('type_tender', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // Name in multiple languages
    name_ru: {type: DataTypes.STRING, unique: true, allowNull: true},  // Russian name
    name_ro: {type: DataTypes.STRING, unique: true, allowNull: true},  // Romanian name
    name_en: {type: DataTypes.STRING, unique: true, allowNull: true},  // English name
})

const Event = sequelize.define('event', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // Title in multiple languages
    title_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian title
    title_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian title
    title_en: {type: DataTypes.TEXT, allowNull: true},  // English title

    // Time of the event
    time_event: {type: DataTypes.STRING, allowNull: true},
    start_date_event: {type: DataTypes.STRING, allowNull: true},
    end_date_event: {type: DataTypes.STRING, allowNull: true},

    // Short description in multiple languages
    short_description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian short description
    short_description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian short description
    short_description_en: {type: DataTypes.TEXT, allowNull: true},  // English short description

    // Long description in multiple languages
    long_description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian long description
    long_description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian long description
    long_description_en: {type: DataTypes.TEXT, allowNull: true},  // English long description

    img: {type: DataTypes.STRING, allowNull: true},
});

const NewsItem = sequelize.define('news_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // Title in multiple languages
    title_ru: {type: DataTypes.STRING, allowNull: true},  // Russian title
    title_ro: {type: DataTypes.STRING, allowNull: true},  // Romanian title
    title_en: {type: DataTypes.STRING, allowNull: true},  // English title

    // Short description in multiple languages
    short_description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian short description
    short_description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian short description
    short_description_en: {type: DataTypes.TEXT, allowNull: true},  // English short description

    // Long description in multiple languages
    long_description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian long description
    long_description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian long description
    long_description_en: {type: DataTypes.TEXT, allowNull: true},  // English long description

    img_1: {type: DataTypes.STRING, allowNull: true},
    img_2: {type: DataTypes.STRING, allowNull: true},
})

const ActivitiesItem = sequelize.define('activities_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // Title in multiple languages
    title_ru: {type: DataTypes.STRING, allowNull: true},  // Russian title
    title_ro: {type: DataTypes.STRING, allowNull: true},  // Romanian title
    title_en: {type: DataTypes.STRING, allowNull: true},  // English title

    // Short description in multiple languages
    short_description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian short description
    short_description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian short description
    short_description_en: {type: DataTypes.TEXT, allowNull: true},  // English short description

    // Long description in multiple languages
    long_description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian long description
    long_description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian long description
    long_description_en: {type: DataTypes.TEXT, allowNull: true},  // English long description

    img_1: {type: DataTypes.STRING, allowNull: true},
    img_2: {type: DataTypes.STRING, allowNull: true},
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // Name in multiple languages
    name_ru: {type: DataTypes.STRING, allowNull: true},  // Russian name
    name_ro: {type: DataTypes.STRING, allowNull: true},  // Romanian name
    name_en: {type: DataTypes.STRING, allowNull: true},  // English name

    // Title in multiple languages
    title_ru: {type: DataTypes.STRING, allowNull: true},  // Russian title
    title_ro: {type: DataTypes.STRING, allowNull: true},  // Romanian title
    title_en: {type: DataTypes.STRING, allowNull: true},  // English title

    // Short description in multiple languages
    short_description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian short description
    short_description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian short description
    short_description_en: {type: DataTypes.TEXT, allowNull: true},  // English short description

    // Long description in multiple languages
    long_description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian long description
    long_description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian long description
    long_description_en: {type: DataTypes.TEXT, allowNull: true},  // English long description

    popular:{type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},

    img_1: {type: DataTypes.STRING, allowNull: true},
    img_2: {type: DataTypes.STRING, allowNull: true},
})

const Tag = sequelize.define('tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // Name in multiple languages
    name_ru: {type: DataTypes.STRING, allowNull: true},  // Russian name
    name_ro: {type: DataTypes.STRING, allowNull: true},  // Romanian name
    name_en: {type: DataTypes.STRING, allowNull: true},  // English name
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // Title in multiple languages
    title_ru: {type: DataTypes.STRING, allowNull: true},  // Russian title
    title_ro: {type: DataTypes.STRING, allowNull: true},  // Romanian title
    title_en: {type: DataTypes.STRING, allowNull: true},  // English title

    // Short description in multiple languages
    short_description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian short description
    short_description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian short description
    short_description_en: {type: DataTypes.TEXT, allowNull: true},  // English short description

    // Long description in multiple languages
    long_description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian long description
    long_description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian long description
    long_description_en: {type: DataTypes.TEXT, allowNull: true},  // English long description

    rating: {type: DataTypes.FLOAT, allowNull: true},
})

const HomePage = sequelize.define('home_page', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // Title in multiple languages
    title_ru: {type: DataTypes.STRING, allowNull: true},  // Russian title
    title_ro: {type: DataTypes.STRING, allowNull: true},  // Romanian title
    title_en: {type: DataTypes.STRING, allowNull: true},  // English title

    // Short description in multiple languages
    short_description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian short description
    short_description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian short description
    short_description_en: {type: DataTypes.TEXT, allowNull: true},  // English short description

    // Long description in multiple languages
    long_description_ru: {type: DataTypes.TEXT, allowNull: true},  // Russian long description
    long_description_ro: {type: DataTypes.TEXT, allowNull: true},  // Romanian long description
    long_description_en: {type: DataTypes.TEXT, allowNull: true},  // English long description

    img_1: {type: DataTypes.STRING, allowNull: true},
    img_2: {type: DataTypes.STRING, allowNull: true},

    title1_ru: {type: DataTypes.TEXT, allowNull: true},
    title1_ro: {type: DataTypes.TEXT, allowNull: true},
    title1_en: {type: DataTypes.TEXT, allowNull: true},

    // Short description in multiple languages
    description1_ru: {type: DataTypes.TEXT, allowNull: true},
    description1_ro: {type: DataTypes.TEXT, allowNull: true},
    description1_en: {type: DataTypes.TEXT, allowNull: true},

    img_3: {type: DataTypes.STRING, allowNull: true},
})

const Faq = sequelize.define('faq', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    question_ru: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    question_ro: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    question_en: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    answer_ru: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    answer_ro: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    answer_en: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
})

const EmailList = sequelize.define('email_list', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
})

const WeekHours = sequelize.define('week_hour', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    dayOfWeek: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    openTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    closeTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
})

const TypeAnimal = sequelize.define('type_animal', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const TagPost = sequelize.define('tag_post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

Type.belongsToMany(Animal, {through : TypeAnimal })
Animal.belongsToMany(Type, {through : TypeAnimal })


TypeTender.hasMany(Tender)
Tender.belongsTo(TypeTender)

Post.belongsToMany(Tag, {through : TagPost })
Tag.belongsToMany(Post, {through : TagPost })

// export {
module.exports = {
    User,
    Animal,
    Type,
    TypeAnimal,
    TagPost,
    Tender,
    TypeTender,
    Event,
    NewsItem,
    ActivitiesItem,
    Post,
    Tag,
    Review,
    HomePage,
    Faq,
    EmailList,
    WeekHours
}
