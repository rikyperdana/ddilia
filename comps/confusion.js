const confMatrix = type => withAs(
  JSON.parse(localStorage.testSet || '[]')
  .map(i => [i.ddi_type, i.pred]),
  pairs => [console.log(pairs)] && withAs(
    {
      tp: pairs.filter(i => ands([
        i[0] === type, i[1] === type
      ])).length,
      fp: pairs.filter(i => ands([
        i[0] !== type, i[1] === type
      ])).length,
      fn: pairs.filter(i => ands([
        i[0] === type, i[1] !== type
      ])).length,
      tn: pairs.filter(i => ands([
        i[0] !== type, i[1] !== type
      ])).length,
    },
    ({tp, fp, tn, fn}) => m('.box', [
      m('h4', _.startCase(type)),
      m('table.table', [
        m('tr', [
          m('td'),
          m('th', 'False Prediction'),
          m('th', 'True Prediction')]
        ),
        m('tr', [
          m('th', 'False Actual'),
          m('td', tn), m('td', fp)
        ]),
        m('tr', [
          m('th', 'True Actual'),
          m('td', fn), m('td', tp)
        ])
      ]),
      m('table.table', [
        m('tr', ['Accuracy', 'Precision', 'Recall', 'F1-Score'].map(
          i => m('th', i)
        )),
        m('tr', withAs(
          {
            precision: tp / (tp + fp),
            recall: tp / (tp + fn)
          },
          ({precision, recall}) => [
            (tp + tn) / (tp + tn + fp + fn),
            precision, recall,
            (precision * recall) / (precision + recall)
          ]
        ).map(i => m('td', `${(i * 100).toString().slice(0, 5)}%`)))
      ])
    ])
  )
)

comps.confusion = x => [
  ['mechanism', 'advise', 'effect', 'none']
  .map(confMatrix)
]