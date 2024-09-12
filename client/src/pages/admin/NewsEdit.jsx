import React from 'react';

function NewsEdit() {

    const fields = [
        'title_ru',
        'title_ro',
        'title_en',
        'short_description_ru',
        'short_description_ro',
        'short_description_en',
        'long_description_ru',
        'long_description_ro',
        'long_description_en',
        'img_1',
        'img_2'
    ];

    return (
        <div>
            Edit current news
        </div>
    );
}

export default NewsEdit;