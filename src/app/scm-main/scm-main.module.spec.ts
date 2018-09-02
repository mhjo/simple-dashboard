import { ScmMainModule } from './scm-main.module';

describe('ScmMainModule', () => {
  let scmMainModule: ScmMainModule;

  beforeEach(() => {
    scmMainModule = new ScmMainModule();
  });

  it('should create an instance', () => {
    expect(scmMainModule).toBeTruthy();
  });
});
