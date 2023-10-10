import { DeviceType } from "@/sdk/entity"
import { Mode } from "@/sdk/theme"
import { BaseViewModel } from "@/sdk/view-model"

export interface BaseComponentViewModel extends BaseViewModel {
    device: DeviceType
    mode: Mode
}