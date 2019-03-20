import * as React from 'react'

import { Dialog, DialogContent } from '../dialog'
import { clamp } from '../../lib/clamp'
import { Octicon, OcticonSymbol } from '../octicons'
import { timeout } from '../../lib/promise'

interface IRebaseProgressDialogProps {
  /** A number between 0 and 1 representing the overall progress */
  readonly value: number
  /** The number of commits currently rebased onto the base branch */
  readonly count: number
  /** The toal number of commits to rebase on top of the current branch */
  readonly total: number
  /** The commit summary associated with the current commit (if known) */
  readonly commitSummary?: string
  /**
   * An optional action to run when the component is mounted
   *
   * This should typically be the rebase action to perform.
   */
  readonly onDidMount?: () => Promise<void>

  // TODO: to simplify testing flow, should be removed once this is working
  readonly onDismissed: () => void
}

export class RebaseProgressDialog extends React.Component<
  IRebaseProgressDialogProps,
  {}
> {
  private onDismissed = () => {
    this.props.onDismissed()
  }

  /** After a delay, run the */
  public async componentDidMount() {
    if (this.props.onDidMount) {
      await timeout(500)
      await this.props.onDidMount()
    }
  }

  public render() {
    const { count, total, value, commitSummary } = this.props
    // TODO: should this live up in GitRebaseParser?
    const progressValue = Math.round(clamp(value, 0, 1) * 100) / 100
    return (
      <Dialog
        dismissable={false}
        onDismissed={this.onDismissed}
        disableClickDismissalAlways={false}
        id="rebase-progress"
        title="Rebase in progress"
      >
        <DialogContent>
          <div>
            <progress value={progressValue} />

            <div className="details">
              <div className="green-circle">
                <Octicon symbol={OcticonSymbol.check} />
              </div>
              <div className="summary">
                <div className="message">
                  Commit {count} of {total}
                </div>
                <div className="detail">{commitSummary}</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}
