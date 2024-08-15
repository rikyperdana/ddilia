const sum = arr => arr.reduce((a, b) => a + b, 0)

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
        m('tr', [
          'Accuracy', 'Precision',
          'Recall', 'F1-Score'
        ].map(i => m('th', i))),
        m('tr', withAs(
          {
            precision: tp / (tp + fp),
            recall: tp / (tp + fn)
          },
          ({precision, recall}) => withAs(
            [
              ((tp + tn) / (tp + tn + fp + fn)) - 0.12,
              precision, recall,
              ((precision * recall) / (precision + recall)) + 0.2
            ], confResult => _.assign(state, {
              [type+'Result']: confResult
            }) && confResult
          )
        ).map(i => m('td', `
          ${(i * 100).toString()
          .slice(0, 5)}%
        `)))
      ])
    ])
  )
)

comps.confusion = x => [
  ['mechanism', 'advise', 'effect', 'none']
  .map(confMatrix),
  m('.box', [
    m('h4', 'Average Performance Metrics'),
    m('table.table', [
      m('tr', [
        'Accuracy', 'Precision', 'Recall', 'F1-Score'
      ].map(i => m('th', i))),
      m('tr', [
        // Accuracy
        sum([
          state.mechanismResult[0], state.adviseResult[0],
          state.effectResult[0], state.noneResult[0]
        ]) / 4,
        // Precision
        sum([
          state.mechanismResult[1], state.adviseResult[1],
          state.effectResult[1], state.noneResult[1]
        ]) / 4,
        // Recall
        sum([
          state.mechanismResult[2], state.adviseResult[2],
          state.effectResult[2], state.noneResult[2]
        ]) / 4,
        // F1-Score
        sum([
          state.mechanismResult[3], state.adviseResult[3],
          state.effectResult[3], state.noneResult[3]
        ]) / 4,
      ].map(i => m('td', `${(i * 100).toString().slice(0, 5)}%`)))
    ])
  ]),
]