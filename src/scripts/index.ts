import '../styles/styles.scss';

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

const application = Application.start()
const context = (require as any).context("./controllers", true, /\.ts$/)
application.load(definitionsFromContext(context))

