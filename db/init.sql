-- ==========================================
-- Media Platform Database Initialization
-- ==========================================


-- ==========================================
-- Movies
-- ==========================================

CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    rating FLOAT,
    release_year INTEGER
);


-- ==========================================
-- Tech Categories
-- ==========================================

CREATE TABLE IF NOT EXISTS tech_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


-- ==========================================
-- Tech News
-- ==========================================

CREATE TABLE IF NOT EXISTS tech_news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    description TEXT,
    category_id INTEGER NOT NULL,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES tech_categories(id)
);


-- ==========================================
-- Movie Sample Data
-- ==========================================

INSERT INTO movies
    (title, description, rating, release_year)
VALUES
    (
        'Inception',
        'A thief who enters dreams to steal secrets.',
        8.8,
        2010
    ),
    (
        'Interstellar',
        'A team travels through a wormhole in search of a new home for humanity.',
        8.7,
        2014
    ),
    (
        'The Dark Knight',
        'Batman faces a criminal mastermind who plunges Gotham into chaos.',
        9.0,
        2008
    ),
    (
        'Avatar',
        'A marine becomes involved in the conflict on the alien world of Pandora.',
        7.8,
        2009
    )
ON CONFLICT DO NOTHING;


-- ==========================================
-- Tech Categories
-- ==========================================

INSERT INTO tech_categories
    (name)
VALUES
    ('Mobiles'),
    ('Cars'),
    ('Laptops'),
    ('AI')
ON CONFLICT (name) DO NOTHING;


-- ==========================================
-- Tech News
-- ==========================================

INSERT INTO tech_news
    (title, description, category_id)
VALUES
    (
        'New Smartphone Technology',
        'Latest developments in smartphone technology.',
        1
    ),
    (
        'New Electric Car Launch',
        'A new generation of electric vehicles is announced.',
        2
    ),
    (
        'New Laptop Processors',
        'New processors bring improved laptop performance.',
        3
    ),
    (
        'Latest AI Developments',
        'Recent developments in artificial intelligence.',
        4
    )
ON CONFLICT DO NOTHING;
