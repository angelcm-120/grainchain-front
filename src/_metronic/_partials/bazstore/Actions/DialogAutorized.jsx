import React from "react";
import { FormattedMessage } from "react-intl";
import SVG from "react-inlinesvg";
import {
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent
} from "@material-ui/core";
import { toAbsoluteUrl } from "../../../_helpers";

export function DialogAutorized({ openDialogAutorized, setOpenDialogAutorized }) {

    const fullWidth = true
    const maxWidth = "sm"

    function handleClose() {
        setOpenDialogAutorized(false);
    }

    return (<>
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openDialogAutorized}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">
                <FormattedMessage id="GLOBAL.WORD.BAZSTORE" />
            </DialogTitle>
            <DialogContent>
                <div className="primary-icon">
                    <span className="svg-icon svg-icon-3x svg-icon-primary">
                        <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Info-circle.svg")}></SVG>
                    </span>
                    <FormattedMessage id="GLOBAL.WORD.MESSAGES.ALERT.PERMISSIONS" />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" type="button">
                    <FormattedMessage id="GLOBAL.WORD.CLOSE" />
                </Button>
            </DialogActions>
        </Dialog>
    </>
    )
}



