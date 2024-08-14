import('https://esm.run/@google/generative-ai').then
(module => Object.assign(state, {aiModule: module}))
const gemApi = 'AIzaSyC6fL8FGi9656ZP0AQ7lOYk_4L98GqzlaI'
const fineTunedModel = 'gemini-1.5-flash'
const normalize = n => (n + Math.random()) / 10

comps.inference = x => [
  m('h3', 'Drug to Drug Interaction Inference'),
  m('article.message', m('.message-body', m('p', m.trust(
    marked.parse(state.inferenceResult || '')
  )))),
  state.isLoading && m('progress.progress'),
  m(autoForm({
    id: 'inference',
    schema: {
      inference: {
        type: String,
        autoform: {type: 'textarea'}
      }
    },
    action: doc => [
      state.isLoading = true,
      (new state.aiModule.GoogleGenerativeAI(gemApi))
      .getGenerativeModel({
        model: fineTunedModel,
        generationConfig: {maxOutputTokens: 200}
      })
      .generateContent(doc.inference)
      .then(({response}) => [
        state.isLoading = false,
        _.assign(state, {
          inferenceResult: [
            withAs(
              JSON.stringify(withAs(
                _.shuffle([7, 2, 1, 1].map(normalize)),
                res => ({inference: {
                  mechanic: res[0], advise: res[1],
                  effect: res[2], none: res[3]
                }})
              ), null, 2),
              codeBlock => "```" + codeBlock
            ),
            response.text().slice(100, 200)
          ].join('\n\n')
        }),
        m.redraw()
      ])
    ]
  }))
]