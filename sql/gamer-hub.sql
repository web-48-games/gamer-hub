DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS rsvp;
DROP TABLE IF EXISTS meetup;
DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS game;


CREATE TABLE IF NOT EXISTS profile(
                                  profile_id UUID PRIMARY KEY,
                                  profile_about_me CHAR(500),
                                  profile_activation_token CHAR(32),
                                  profile_avatar_url VARCHAR(128),
                                  profile_creation_date TIMESTAMPTZ,
                                  profile_email VARCHAR(128),
                                  profile_hash CHAR(97),
                                  profile_name VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS game(
                               game_id UUID PRIMARY KEY,
                               game_description VARCHAR(512),
                               game_genre VARCHAR(32),
                               game_image_url VARCHAR(128),
                               game_max_players INT,
                               game_name VARCHAR(32),
                               game_year_published TIMESTAMPTZ
);


CREATE TABLE IF NOT EXISTS favorite(
                                favorite_game_id UUID NOT NULL,
                                favorite_profile_id UUID NOT NULL,
    FOREIGN KEY (favorite_game_id) REFERENCES game(game_id),
    FOREIGN KEY (favorite_profile_id) REFERENCES profile(profile_id),
    PRIMARY KEY (favorite_game_id, favorite_profile_id)
);

CREATE INDEX ON favorite(favorite_game_id);

CREATE INDEX ON favorite(favorite_profile_id);





CREATE TABLE IF NOT EXISTS meetup(
                                 meetup_id UUID PRIMARY KEY,
                                 meetup_game_id UUID NOT NULL,
                                 meetup_host_profile_id UUID NOT NULL,
                                 meetup_address VARCHAR NOT NULL,
                                 meetup_created_at TIMESTAMPTZ,
                                 meetup_description VARCHAR(512),
                                 meetup_duration DECIMAL,
                                 meetup_lat FLOAT,
                                 meetup_long FLOAT,
                                 meetup_start_time TIMESTAMPTZ,
    FOREIGN KEY (meetup_game_id) REFERENCES game(game_id),
    FOREIGN KEY (meetup_host_profile_id) REFERENCES profile(profile_id)
);

CREATE INDEX ON meetup(meetup_game_id);

CREATE INDEX ON meetup(meetup_host_profile_id);



CREATE TABLE IF NOT EXISTS message(
                                  message_id UUID PRIMARY KEY,
                                  message_profile_id UUID NOT NULL,
                                  message_meetup_id uuid NOT NULL,
                                  message_content VARCHAR(256),
                                  message_timestamp TIMESTAMPTZ,
    FOREIGN KEY (message_profile_id) REFERENCES profile(profile_id),
    FOREIGN KEY (message_meetup_id) REFERENCES meetup(meetup_id)
);

CREATE INDEX ON message(message_profile_id);

CREATE INDEX ON message(message_meetup_id);

CREATE TABLE IF NOT EXISTS rsvp(
                               rsvp_profile_id UUID NOT NULL,
                               rsvp_meetup_id UUID NOT NULL,
                               rsvp_at TIMESTAMPTZ,
    FOREIGN KEY (rsvp_profile_id) REFERENCES profile(profile_id),
    FOREIGN KEY (rsvp_meetup_id) REFERENCES meetup(meetup_id),
    PRIMARY KEY (rsvp_profile_id, rsvp_meetup_id)
);

CREATE INDEX ON rsvp(rsvp_profile_id);

CREATE INDEX ON rsvp(rsvp_meetup_id);

