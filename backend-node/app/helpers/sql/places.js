import squel from 'squel';
import { TABLES } from '../../constants';

const table = TABLES.PLACES;
const squelPostgres = squel.useFlavour('postgres');

export function getDeletePlaceByCompanyIdQuery(id) {
    return squelPostgres.delete()
        .from(table.NAME)
        .where(`company_id = '${id}'`)
        .returning('*')
        .toString();
}

export function getDeletePlaceByIdQuery(ids) {
    return squelPostgres.delete()
        .from(table.NAME)
        .where(`id IN ('${ids.join('\',\'')}')`)
        .returning('*')
        .toString();
}
