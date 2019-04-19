import { Selector } from 'testcafe';

fixture `Test Page`
    .page `http://localhost:3000/test`;

test('buttons and form test', async t => {
    await t
        .click(Selector('button').withText('Open modal'))
        .click(Selector('span').withText('CLOSE MODAL'))
        .typeText(Selector('#name'), '123')
        .typeText(Selector('#age'), '123')
        .click(Selector('button').withText('Create'))
        .click(Selector('button').withText('Open modal'))
        .click(Selector('.ModalsPortal--content-26'));
});
