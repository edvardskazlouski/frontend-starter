# MBA Backend

## To config enviroment variables: create '.env' file and fill it (example at '.env.example'):

*database*
* DB_DEV_NAME=mba_dev - development database name
* DB_DEV_HOST=localhost - development database host
* DB_DEV_PORT=5432 - development database port
* DB_DEV_USER=postgres - development database user name
* DB_DEV_PASS=12345 - development database user password

* DB_TEST_NAME=mba_test - test database name
* DB_TEST_HOST=localhost - test database host
* DB_TEST_PORT=5432 - test database port
* DB_TEST_USER=postgres - test database user name
* DB_TEST_PASS=root - test database user password

*logs*
* LOG_LEVEL=4 - logger config:
    * 0: logs off
    * 1: info
    * 2: debug
    * 3: warnings
    * 4: errors

*mail sending service*
* MAIL_HOST=smtp.gmail.com
* MAIL_PORT=465
* MAIL_ADDRESS=mba.test.228@gmail.com
* MAIL_PASSWORD=zx1722abr
* MAIL_AUTHOR=MBA team <mba.test.228@gmail.com>

## To create a migration:
`npm run create-migration YOUR_MIGRATION_NAME`
