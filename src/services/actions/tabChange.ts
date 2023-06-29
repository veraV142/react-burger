export const TAB_CHANGE = "TAB_CHANGE"

export interface ITabChange {
	type: typeof TAB_CHANGE;
	tab: string;
}

export type ITabChangeAction = | ITabChange;