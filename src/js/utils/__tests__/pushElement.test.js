import cleanDOM from '../../../../tests/utils/cleanDOM';
import createDiv from '../../../../tests/utils/createDiv';
import prepareContainer from '../../../../tests/utils/prepareContainer';
import pushElements from '../pushElement';

const pushContainerId = 'pushContainer';
const pushContainerEl = `#${pushContainerId}`;
const simpleElClassName = 'simpleElement';
const multipleElClassName = 'multipleElement';

afterAll(() => cleanDOM());

describe('test append child into element', () => {
  prepareContainer(pushContainerId);

  it('append one element to container', () => {
    pushElements(pushContainerEl, createDiv(simpleElClassName));

    expect(document.querySelector(`.${simpleElClassName}`)).toBeTruthy();
  });
  it('append multiple elements into container', () => {
    pushElements(pushContainerEl, [
      createDiv(multipleElClassName),
      createDiv(multipleElClassName),
    ]);

    expect(document.querySelectorAll(`.${multipleElClassName}`).length).toBe(2);
  });
});
