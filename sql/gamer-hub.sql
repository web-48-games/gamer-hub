DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS meetup;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS rsvp;

CREATE TABLE IF NOT EXISTS profile(
                                  profile_id UUID PRIMARY KEY
                                  profile_about_me CHAR(500)
                                  profile_activation_token CHAR(32)
                                  profile_avatar_url VARCHAR
                                  profile_creation_date TIMESTAMP
                                  profile_email VARCHAR
                                  profile_hash CHAR(97)
                                  profile_name VARCHAR
)

CREATE TABLE IF NOT EXISTS game(
                               game_id UUID PRIMARY KEY
                               game_description TEXT [NOTE: 'Description of game']
                               game_genre VARCHAR
                               game_image_url VARCHAR
                               game_max_players INTEGER
                               game_name VARCHAR
                               game_year_published TIMESTAMP
)

CREATE TABLE IF NOT EXISTS favorite(
                                favorite_game_id UUID NOT NULL
                                favorite_profile_id UUID NOT NULL
    FOREIGN KEY (favorite_game_id) REFERENCES game(game_id),
    FOREIGN KEY (favorite_profile_id) REFERENCES profile(profile_id),
    PRIMARY KEY (favorite_game_id, favorite_profile_id)
)


CREATE TABLE IF NOT EXISTS meetup(
                                 meetup_id UUID PRIMARY KEY
                                 meetup_game_id UUID NOT NULL
                                 meetup_host_profile_id NOT NULL
                                 meetup_address VARCHAR NOT NULL
                                 meetup_created_at TIMESTAMP
                                 meetup_description TEXT NOTE: 'Description of meetup'
                                 meetup_duration DECIMAL
                                 meetup_lat FLOAT
                                 meetup_long FLOAT
                                 meetup_start_time TIMESTAMP
    FOREIGN KEY (meetup_game_id) REFERENCES game(game_id),
    FOREIGN KEY (meetup_host_profile_id) REFERENCES profile(profile_id),
    PRIMARY KEY (meetup_id)
)

CREATE TABLE IF NOT EXISTS message(
                                  message_id UUID PRIMARY KEY
                                  message_profile_id INTEGER NOT NULL
                                  message_meetup_id INTEGER
                                  message_content TEXT
                                  message_timestamp TIMESTAMP
    FOREIGN KEY (message_profile_id) REFERENCES (profile_id),
    FOREIGN KEY (message_meetup_id) REFERENCES meetup(meetup_id),
    PRIMARY KEY (message_id)
)

CREATE TABLE IF NOT EXISTS rsvp(
                               rsvp_profile_id INTEGER NOT NULL
                               rsvp_meetup_id INTEGER NOT NULL
                               rsvp_at TIMESTAMP
    FOREIGN KEY (rsvp_profile_id) REFERENCES profile(profile_id),
    FOREIGN KEY (rsvp_meetup_id) REFERENCES meetup(meetup_id),
    PRIMARY KEY (rxvp_profile_id, rsvp_meetup_id)
)

