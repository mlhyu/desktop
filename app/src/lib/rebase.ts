import { IRepositoryState, RebaseConflictState } from '../lib/app-state'
import {
  ChooseBranchesStep,
  RebaseStep,
  ShowConflictsStep,
} from '../models/rebase-flow-state'
import { Branch } from '../models/branch'
import { TipState } from '../models/tip'

export const initializeNewRebaseFlow = (state: IRepositoryState) => {
  const {
    defaultBranch,
    allBranches,
    recentBranches,
    tip,
  } = state.branchesState
  let currentBranch: Branch | null = null

  if (tip.kind === TipState.Valid) {
    currentBranch = tip.branch
  } else {
    debugger
    throw new Error('invalid setup for rebase flow')
  }

  const initialState: ChooseBranchesStep = {
    kind: RebaseStep.ChooseBranch,
    defaultBranch,
    currentBranch,
    allBranches,
    recentBranches,
  }

  return initialState
}

export const initializeRebaseFlowForConflictedRepository = (
  conflictState: RebaseConflictState
) => {
  const { targetBranch, baseBranch } = conflictState

  const initialState: ShowConflictsStep = {
    kind: RebaseStep.ShowConflicts,
    targetBranch,
    baseBranch,
  }

  return initialState
}
