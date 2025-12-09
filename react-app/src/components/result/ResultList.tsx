import React, { useState, useEffect, FC } from "react";
import { Button as ControlButton } from "../../control";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Table, Accordion } from "react-bootstrap";
import { createAPIEndpoint, ENDPOINTS } from "../../api/Index";
import { BsTrash, BsList } from "react-icons/bs";
import { useTranslation } from "react-i18next";

interface ResultType {
  beamId: number;
  beamName: string;
  beamDefinition: string;
  s1: number;
  s2: number;
  vmax: number;
  vmin: number;
  mmax: number;
  mmin: number;
  dmax: number;
  dmin: number;
  types: Type[];
}

interface Type {
  typeId: number;
  xp: number;
  fy: number;
  xm: number;
  m: number;
  xStartUDL: number;
  xEndUDL: number;
  fyUDL: number;
  xStartLDL: number;
  xEndLDL: number;
  fy_StartLDL: number;
  fy_EndLDL: number;
}

interface Props {
  updateResult: boolean;
  setUpdateResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultList: FC<Props> = (props) => {
  const { t } = useTranslation(["result"]);
  const { updateResult, setUpdateResult } = props;

  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const [resultList, setResultList] = useState<ResultType[]>([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.BEAM)
      .fetchAll()
      .then((res) => {
        setResultList(res.data);
      })
      .catch((err) => console.log(err));

    setUpdateResult(false);
  }, [updateResult]);

  const onDeleteResult = (id: number) => {
    createAPIEndpoint(ENDPOINTS.BEAM)
      .delete(id)
      .then((res) => {
        setUpdateResult(true);
      })
      .catch((err) => console.log(err));
  };

  // mäpätään resurssit-taulukon rivit Modal-tauluun
  const rowsResults = resultList.map((r, x) => {
    const rowsTypes = r.types.map((tyyppi, index) => {
      return (
        <tr key={index}>
          <td>{tyyppi.typeId}</td>
          <td>{tyyppi.xp}</td>
          <td>{tyyppi.fy}</td>
          <td>{tyyppi.xm}</td>
          <td>{tyyppi.m}</td>
          <td>{tyyppi.xStartUDL}</td>
          <td>{tyyppi.xEndUDL}</td>
          <td>{tyyppi.fyUDL}</td>
          <td>{tyyppi.xStartLDL}</td>
          <td>{tyyppi.xEndLDL}</td>
          <td>{tyyppi.fy_StartLDL}</td>
          <td>{tyyppi.fy_EndLDL}</td>
        </tr>
      );
    });
    return (
      <Accordion>
        <Accordion.Item as={Button} variant="link" eventKey="0">
          <Accordion.Header>
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Definition</th>
                  <th>S1</th>
                  <th>S2</th>
                  <th>Vmax</th>
                  <th>Vmin</th>
                  <th>Mmax</th>
                  <th>Mmin</th>
                  <th>Dmax</th>
                  <th>Dmin</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr key={x}>
                  <td>{r.beamId}</td>
                  <td>{r.beamName}</td>
                  <td>{r.beamDefinition}</td>
                  <td>{r.s1}</td>
                  <td>{r.s2}</td>
                  <td>{r.vmax}</td>
                  <td>{r.vmin}</td>
                  <td>{r.mmax}</td>
                  <td>{r.mmin}</td>
                  <td>{r.dmax}</td>
                  <td>{r.dmin}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={(e) => onDeleteResult(r.beamId)}
                    >
                      <BsTrash />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Header>
          <Accordion.Body>
            <Table>
              <thead>
                <tr>
                  <th>TypeId</th>
                  <th>Xp</th>
                  <th>Fy</th>
                  <th>Xm</th>
                  <th>M</th>
                  <th>XStartUDL</th>
                  <th>XEndUDL</th>
                  <th>FyUDL</th>
                  <th>XStartLDL</th>
                  <th>XEndLDL</th>
                  <th>Fy_StartLDL</th>
                  <th>Fy_EndLDL</th>
                </tr>
              </thead>
              <tbody>{rowsTypes}</tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  });

  return (
    <>
      <div>
        {/* palkin esittäminen tietokantasta */}
        <ControlButton variant="contained" onClick={handleShow}>
          <BsList />
          {t("result:buttonSavesResults")}
        </ControlButton>
      </div>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{t("result:resultList")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{rowsResults}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            {t("result:close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResultList;
