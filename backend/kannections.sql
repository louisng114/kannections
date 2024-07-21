\echo 'Delete and recreate kannections db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE kannections;
CREATE DATABASE kannections;
\connect kannections

\i kannections-schema.sql
\i achievements.sql

\echo 'Delete and recreate kannections_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE kannections_test;
CREATE DATABASE kannections_test;
\connect kannections_test

\i kannections-schema.sql