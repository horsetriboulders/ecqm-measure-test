import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataRepository from '../../components/DataRepository';
import { ServerUtils } from '../../utils/ServerUtils';


beforeAll(() => {
    //cache the server list with test data
    ServerUtils.setMockData();
  });

test('expect functions to be called when selecting items in dropdown', async () => {
    const patients = ['test-patient-1', 'test-patient-2'];
    const servers = await ServerUtils.getServerList();

    const loadingFlag: boolean = false;
    const showDataRepo: boolean = true;

    const fetchPatients = jest.fn();
    const setSelectedPatient = jest.fn();

    render(<DataRepository
        showDataRepo={showDataRepo}
        setShowDataRepo={jest.fn()}
        servers={servers}
        setSelectedDataRepo={jest.fn()}
        selectedDataRepo={servers[1]}
        patients={patients}
        fetchPatients={fetchPatients}
        setSelectedPatient={setSelectedPatient}
        selectedPatient={patients[0]}
        collectData={jest.fn()}
        loading={loadingFlag}
    />);

    //select first server
    const serverDropdown: HTMLSelectElement = screen.getByTestId('data-repo-server-dropdown');
    userEvent.selectOptions(serverDropdown, servers[0].baseUrl);
    expect(fetchPatients).toBeCalledWith(servers[0])

    //select first patient
    const patientDropdown: HTMLSelectElement = screen.getByTestId('data-repo-patient-dropdown');
    userEvent.selectOptions(patientDropdown, 'test-patient-1');
    expect(setSelectedPatient).toBeCalledWith('test-patient-1')

});

test('expect spinner to show when loading is true', async () => {
    const patients = ['test-patient-1', 'test-patient-2'];
    const servers = await ServerUtils.getServerList();

    const loadingFlag: boolean = true;
    const showDataRepo: boolean = true;

    const fetchPatients = jest.fn();
    const setSelectedPatient = jest.fn();

    render(<DataRepository
        showDataRepo={showDataRepo}
        setShowDataRepo={jest.fn()}
        servers={servers}
        setSelectedDataRepo={jest.fn()}
        selectedDataRepo={servers[1]}
        patients={patients}
        fetchPatients={fetchPatients}
        setSelectedPatient={setSelectedPatient}
        selectedPatient={patients[0]}
        collectData={jest.fn()}
        loading={loadingFlag}
    />);

    const evaluateButtonWithSpinner: HTMLButtonElement = screen.getByTestId('data-repo-collect-data-button-spinner');
    expect(evaluateButtonWithSpinner).toBeInTheDocument();
});

test('hide section', async () => {
    const patients = ['test-patient-1', 'test-patient-2'];
    const servers = await ServerUtils.getServerList();

    const loadingFlag: boolean = false;
    const showDataRepo: boolean = false;

    const setShowDataRepo = jest.fn();
    const setSelectedDataRepo = jest.fn();
    const fetchPatients = jest.fn();
    const setSelectedPatient = jest.fn();
    const collectData = jest.fn();


    render(<DataRepository
        showDataRepo={showDataRepo}
        setShowDataRepo={setShowDataRepo}
        servers={servers}
        setSelectedDataRepo={setSelectedDataRepo}
        selectedDataRepo={servers[0]}
        patients={patients}
        fetchPatients={fetchPatients}
        setSelectedPatient={setSelectedPatient}
        selectedPatient={''}
        collectData={collectData}
        loading={loadingFlag}
    />);

    const hideShowButton: HTMLButtonElement = screen.getByTestId('data-repo-show-section-button');
    fireEvent.click(hideShowButton);
    expect(setShowDataRepo).toHaveBeenCalledWith(true);
});

test('show section', async () => {
    const patients = ['test-patient-1', 'test-patient-2'];
    const servers = await ServerUtils.getServerList();

    const loadingFlag: boolean = false;
    const showDataRepo: boolean = true;

    const setShowDataRepo = jest.fn();
    const setSelectedDataRepo = jest.fn();
    const fetchPatients = jest.fn();
    const setSelectedPatient = jest.fn();
    const collectData = jest.fn();

    render(<DataRepository
        showDataRepo={showDataRepo}
        setShowDataRepo={setShowDataRepo}
        servers={servers}
        setSelectedDataRepo={setSelectedDataRepo}
        selectedDataRepo={servers[0]}
        patients={patients}
        fetchPatients={fetchPatients}
        setSelectedPatient={setSelectedPatient}
        selectedPatient={''}
        collectData={collectData}
        loading={loadingFlag}
    />);

    const evaluateButton: HTMLButtonElement = screen.getByTestId('data-repo-hide-section-button');
    fireEvent.click(evaluateButton);
    expect(setShowDataRepo).toHaveBeenCalledWith(false);
});

 