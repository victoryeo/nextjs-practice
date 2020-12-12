import classnames from 'classnames'
import { useContext } from 'react'
import { MatrixTableContext, MatrixTableContextProvider } from './context'

type Props = {
  initialMatrix?: import('../../types').Matrix
} & import('react').HTMLAttributes<HTMLDivElement>

/**
 * Add 4 buttons:
 * - Cancel to reset the matrix to how it was before changing the values (only when in edit mode)
 * - Edit to make the fields editable (only when not in edit mode)
 * - Clear to completely clear the table
 * - Save to save the table
 * @param param0
 */
const MatrixTable: import('react').FC<Omit<Props, 'initialMatrix'>> = ({ className, children, ...props }) => {
  // State ------------------------------------------------------------------- //
  const [{ matrix }, dispatch] = useContext(MatrixTableContext)

  // Handlers ---------------------------------------------------------------- //
  const cancel = async () => {
    const tsmonthlite = document.getElementById("tsmonthlite")
    const tsmonthstd = document.getElementById("tsmonthstd")
    const tsmonthunlimited = document.getElementById("tsmonthunlimited")
    const tfmonthlite = document.getElementById("tfmonthlite")
    const tfmonthstd = document.getElementById("tfmonthstd")
    const tfmonthunlimited = document.getElementById("tfmonthunlimited")

    tsmonthlite.setAttribute('readOnly', 'readonly')
    tsmonthstd.setAttribute('readOnly', 'readonly')
    tsmonthunlimited.setAttribute('readOnly', 'readonly')
    tfmonthlite.setAttribute('readOnly', 'readonly')
    tfmonthstd.setAttribute('readOnly', 'readonly')
    tfmonthunlimited.setAttribute('readOnly', 'readonly')

    //cancel the change
    dispatch({
      type: 'SET_MATRIX',
    })
  }

  const save = async () => {
    const tsmonthlite = document.getElementById("tsmonthlite")
    const tsmonthstd = document.getElementById("tsmonthstd")
    const tsmonthunlimited = document.getElementById("tsmonthunlimited")
    const tfmonthlite = document.getElementById("tfmonthlite")
    const tfmonthstd = document.getElementById("tfmonthstd")
    const tfmonthunlimited = document.getElementById("tfmonthunlimited")
    tsmonthlite.setAttribute('readOnly', 'readonly')
    tsmonthstd.setAttribute('readOnly', 'readonly')
    tsmonthunlimited.setAttribute('readOnly', 'readonly')
    tfmonthlite.setAttribute('readOnly', 'readonly')
    tfmonthstd.setAttribute('readOnly', 'readonly')
    tfmonthunlimited.setAttribute('readOnly', 'readonly')

    let data = {
      "36months" : {
          "lite" : matrix["36months"].lite,
          "standard" : matrix["36months"].standard,
          "unlimited" : matrix["36months"].unlimited
      },
      "24months" : {
          "lite" : matrix["24months"].lite,
          "standard" : matrix["24months"].standard,
          "unlimited" : matrix["24months"].unlimited
      },
    }

    //Save (to api) the matrix here.
    const res = await fetch('http://localhost:3000/api/save-pricing', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
          //if Joi validate shows the error below
          //Error [ValidationError]: "value" must be of type object
          //You must set the headers to
          //{ 'Content-Type': 'application/json' }
    })
    console.log(res)

    //Remember to update originalMatrix when done.
    dispatch({
      type: 'SET_ORIGINAL_MATRIX',
    })
  }

  const clear = async () => {
    dispatch({
      type: 'CLEAR_MATRIX',
      payload: 0
    })
  }

  const edit = async () => {
    const tsmonthlite = document.getElementById("tsmonthlite")
    const tsmonthstd = document.getElementById("tsmonthstd")
    const tsmonthunlimited = document.getElementById("tsmonthunlimited")
    const tfmonthlite = document.getElementById("tfmonthlite")
    const tfmonthstd = document.getElementById("tfmonthstd")
    const tfmonthunlimited = document.getElementById("tfmonthunlimited")

    if (tsmonthlite.hasAttribute('readOnly')) {
      tsmonthlite.removeAttribute('readOnly')
    }
    if (tsmonthstd.hasAttribute('readOnly')) {
      tsmonthstd.removeAttribute('readOnly')
    }
    if (tsmonthunlimited.hasAttribute('readOnly')) {
      tsmonthunlimited.removeAttribute('readOnly')
    }
    if (tfmonthlite.hasAttribute('readOnly')) {
      tfmonthlite.removeAttribute('readOnly')
    }
    if (tfmonthstd.hasAttribute('readOnly')) {
      tfmonthstd.removeAttribute('readOnly')
    }
    if (tfmonthunlimited.hasAttribute('readOnly')) {
      tfmonthunlimited.removeAttribute('readOnly')
    }
  }
  // Effects ----------------------------------------------------------------- //

  // Rendering --------------------------------------------------------------- //
  return (
    <div className={classnames(['container', className])} {...props}>
      <br />
      <table>
      <thead><tr>
      <th></th>
      <th>lite</th>
      <th>standard</th>
      <th>unlimited</th>
      </tr></thead>
      <tbody >
      <tr>
      <td>36months:</td>
      <td>
        <input type="HIDDEN" size="3" value="30" onChange={(e) => console.log(e)} />
        <input id="tsmonthlite"
        readOnly
        size="6"
        value={matrix["36months"].lite || ''}
        onChange={(e) => dispatch({
          type: '36MONTH_LITE_ACTION',
          payload: e.target.value
        })} /></td>
      <td><input id="tsmonthstd"
        readOnly
        size="6"
        value={matrix["36months"].standard || ''}
        onChange={(e) => dispatch({
          type: '36MONTH_STD_ACTION',
          payload: e.target.value
        })} /></td>
      <td><input id="tsmonthunlimited"
        readOnly
        size="6"
        value={matrix["36months"].unlimited || ''}
        onChange={(e) => dispatch({
          type: '36MONTH_UNLIMITED_ACTION',
          payload: e.target.value
        })} /></td>
      </tr>
      <tr>
      <td>24months:</td>
      <td><input id="tfmonthlite"
        readOnly
        size="6"
        value={matrix["24months"].lite || ''}
        onChange={(e) => dispatch({
          type: '24MONTH_LITE_ACTION',
          payload: e.target.value
        })} /></td>
      <td><input id="tfmonthstd"
        readOnly
        size="6"
        value={matrix["24months"].standard || ''}
        onChange={(e) => dispatch({
          type: '24MONTH_STD_ACTION',
          payload: e.target.value
        })} /></td>
      <td><input id="tfmonthunlimited"
        readOnly
        size="6"
        value={matrix["24months"].unlimited || ''}
        onChange={(e) => dispatch({
          type: '24MONTH_UNLIMITED_ACTION',
          payload: e.target.value
        })} /></td>
      </tr>
      </tbody>
      </table>
      <div align="right">
        <button className="block" onClick={edit}>Edit</button>
        <button className="block" onClick={clear}>Clear</button>
        <button className="block" onClick={save}>Save</button>
        <button className="block" onClick={cancel}>Cancel</button>
      </div>
      <style jsx>{`
        .container {

        }
        .block {
          width: 20%;
          background-color: 4CAF60;
          text-align: center;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

const MatrixTableWithContext: import('react').FC<Props> = ({ initialMatrix, ...props }) => {
  // You can fetch the pricing here or in pages/index.ts
  // Remember that you should try to reflect the state of pricing in originalMatrix.
  // matrix will hold the latest value (edited or same as originalMatrix)

  return (
    <MatrixTableContextProvider initialMatrix={initialMatrix}>
      <MatrixTable {...props} />
    </MatrixTableContextProvider>
  )
}

export default MatrixTableWithContext
