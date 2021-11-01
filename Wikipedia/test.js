import { Selector, ClientFunction } from 'testcafe';


fixture `Wikipedia Main page`
   .page `https://en.wikipedia.org/wiki/Main_Page`;

test('Wikipedia Test', async t => {
    const Wikilogo = Selector('#p-logo');
    const imgField = Selector('.thumbinner').child('a');
    const imgPos = Selector(imgField).child('img');
    const RandomPageLink = Selector('#n-randompage');
    const container = Selector('#References');
    const back = ClientFunction(() => window.history.back());
    const ul = Selector('.vector-menu-content-list');
    const liQuantity = Selector('.interlanguage-link-target > span').innerText;
    const count = await liQuantity.count;
    var lenguages = [];
    const elements = Selector('.interlanguage-link-target');
    const text = await Selector('.interlanguage-link-target > span').innerText;
    let textLenguage = "";
    


    
    await t
        .expect(Selector(Wikilogo, {visibilityCheck: true})
        .exists).ok();

    await t.
        wait(2500)
        .hover(imgPos)
        .wait(2500);

    await t
        .hover(RandomPageLink)
        .wait(2500)
        .click(RandomPageLink)
        .wait(2500);

    if(await container.exists){
        await t
            .scroll(container, 'center');
    }else{
        console.log("External links not found");
    }
    await back();

    for (let i = 0; i <= (await ul.child('li').count); i++) {
        if(await Selector('.interlanguage-link-target > span').nth(i).exists){
            lenguages.push(await Selector('.interlanguage-link-target > span').nth(i).innerText);
        }
    }
    
    const random = Math.floor(Math.random() * lenguages.length);
    textLenguage = (random, lenguages[random]);
    console.log(textLenguage);

    await t
        .hover( Selector('.interlanguage-link-target > span').withExactText(textLenguage))
        .wait(2500)
        .click(Selector('.interlanguage-link-target > span').withExactText(textLenguage))
        .wait(5000);
});