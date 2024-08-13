comps.confusion = x => [
  [
    {
      title: 'Word2Vec & CNN',
      data: [88.65, 75.03, 77.80, 77.38]
    },
    {
      title: 'Word2Vec & LSTM',
      data: [80.59, 75.23, 78.10, 76.82]
    },
    {
      title: 'BERT & CNN',
      data: [78.50, 76.90, 87.84, 82.39]
    },
    {
      title: 'BERT & LSTM',
      data: [78.17, 78.41, 83.79, 20.25]
    }
  ].map(i => m('.box',
    m('h4', i.title),
    m('table.table', [
      m('tr', [
        'Accuracy', 'Precision',
        'Recall', 'F1-Score'
      ].map(j => m('th', j))),
      m('tr', i.data.map(j => m('td', `${j-1}%`)))
    ])
  ))
]