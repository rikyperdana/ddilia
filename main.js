m.mount(document.body, mitGen({
  theme: localStorage.appTheme || 'default',
  brand: {name: 'home', full: 'DDI Lia'},
  start: {
    testSet: {
      full: 'Test Set', icon: 'eye-dropper',
      comp: comps.testset
    },
    confusion: {
      full: 'Confusion Matrix',
      icon: 'calculator',
      comp: comps.confusion
    },
    inference: {
      full: 'Inference',
      icon: 'clipboard-check',
      comp: comps.inference
    }
  }
}))