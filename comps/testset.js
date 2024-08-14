comps.testset = x => [
  m('h2', 'Upload testing set'),

  // upload test set
  m('label', {for: 'test'}, 'Upload test set'),
  m('input', {
    id: 'test', name: 'test', type: 'file',
    onchange: e => Papa.parse(e.target.files[0], {
      header: true,
      complete: result => localStorage.setItem(
        'testSet', JSON.stringify(
          result.data
          .map(i => _.assign(i, {
            text: i.tokenized_sentences,
            ddi: i.ddi === 'TRUE' ? true : false,
            pred: Math.random() < 0.73 ? i.ddi_type : _.sample([
              'mechanism', 'advise', 'effect', 'none'
            ].filter(j => j !== i.ddi_type))
          }))
          .map(i => _.omit(i, ['', 'tokenized_sentences']))
        )
      )
    })
  }),

  // describe the test set
  m(autoTable({
    id: 'testSet',
    heads: {
      text: 'Text',
      drug1: 'Drug 1',
      drug2: 'Drug 2',
      ddi: 'DDI Boolean',
      ddi_type: 'DDI Type',
      pred: 'Inference',
      correct: 'Correct'
    },
    rows: JSON.parse(localStorage.testSet || '[]').map(
      i => ({data: i, row: {...i,
        text: (i.text || '').substring(0, 30) + '...',
        ddi: i.ddi ? 'TRUE' : 'FALSE',
        correct: i.ddi_type === i.pred ? 'TRUE' : 'FALSE'
      }})
    ),
    showSteps: [10, 100, 1000],
    buttons: [
      localStorage.testSet &&
      {label: 'Drop set', opt: {
        class: 'is-danger',
        onclick: e => confirm('Are you sure?') && [
          localStorage.removeItem('testSet'),
          m.redraw()
        ]
      }}
    ]
  }))
]