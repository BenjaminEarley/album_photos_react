import {TestRepository} from "./shared";
import {Album} from "../domain";


test('albums hook', () => {
    const oneAlbum = new TestRepository({albums: [new Album(1, 1, "")], photos: []})
    //TODO: test that hook emits albums with max of 12 items
});