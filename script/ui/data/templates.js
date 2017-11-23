/****************************************************************************
 * Copyright 2017 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/

import molfile from '../../chem/molfile';

export default [
	'Benzene\n' +
			'  Ketcher 11161218352D 1   1.00000     0.00000     0\n' +
			'\n' +
			'  6  6  0     0  0            999 V2000\n' +
			'    0.8660    2.0000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    1.7320    1.5000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    1.7320    0.5000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.8660    0.0000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.0000    0.5000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.0000    1.5000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'  1  2  1  0     0  0\n' +
			'  2  3  2  0     0  0\n' +
			'  3  4  1  0     0  0\n' +
			'  4  5  2  0     0  0\n' +
			'  5  6  1  0     0  0\n' +
			'  6  1  2  0     0  0\n' +
			'M  END\n',
	'Cyclopentadiene\n' +
			'  Ketcher 11161218352D 1   1.00000     0.00000     0\n' +
			'\n' +
			'  5  5  0     0  0            999 V2000\n' +
			'    0.0000    1.4257    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.8090    0.8379    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.5000   -0.1132    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'   -0.5000   -0.1132    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'   -0.8090    0.8379    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'  1  2  1  0     0  0\n' +
			'  2  3  2  0     0  0\n' +
			'  3  4  1  0     0  0\n' +
			'  4  5  2  0     0  0\n' +
			'  5  1  1  0     0  0\n' +
		'M  END\n',

	'Cyclohexane\n' +
			'  Ketcher 11161218352D 1   1.00000     0.00000     0\n' +
			'\n' +
			'  6  6  0     0  0            999 V2000\n' +
			'    0.8660    2.0000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    1.7320    1.5000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    1.7320    0.5000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.8660    0.0000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.0000    0.5000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.0000    1.5000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'  1  2  1  0     0  0\n' +
			'  2  3  1  0     0  0\n' +
			'  3  4  1  0     0  0\n' +
			'  4  5  1  0     0  0\n' +
			'  5  6  1  0     0  0\n' +
			'  6  1  1  0     0  0\n' +
		'M  END\n',

	'Cyclopentane\n' +
			'  Ketcher 11161218352D 1   1.00000     0.00000     0\n' +
			'\n' +
			'  5  5  0     0  0            999 V2000\n' +
			'    0.8090    1.5389    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    1.6180    0.9511    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    1.3090    0.0000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.3090    0.0000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.0000    0.9511    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'  1  2  1  0     0  0\n' +
			'  2  3  1  0     0  0\n' +
			'  3  4  1  0     0  0\n' +
			'  4  5  1  0     0  0\n' +
			'  5  1  1  0     0  0\n' +
		'M  END\n',

	'Cyclopropane\n' +
			'  Ketcher 11161218352D 1   1.00000     0.00000     0\n' +
			'\n' +
			'  3  3  0     0  0            999 V2000\n' +
			'   -3.2250   -0.2750    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'   -2.2250   -0.2750    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'   -2.7250    0.5910    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'  1  2  1  0     0  0\n' +
			'  2  3  1  0     0  0\n' +
			'  1  3  1  0     0  0\n' +
		'M  END\n',

	'Cyclobutane\n' +
			'  Ketcher 11161218352D 1   1.00000     0.00000     0\n' +
			'\n' +
			'  4  4  0     0  0            999 V2000\n' +
			'   -3.8250    1.5500    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'   -3.8250    0.5500    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'   -2.8250    1.5500    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'   -2.8250    0.5500    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'  1  2  1  0     0  0\n' +
			'  1  3  1  0     0  0\n' +
			'  3  4  1  0     0  0\n' +
			'  4  2  1  0     0  0\n' +
		'M  END\n',

	'Cycloheptane\n' +
			'  Ketcher 11161218352D 1   1.00000     0.00000     0\n' +
			'\n' +
			'  7  7  0     0  0            999 V2000\n' +
			'    0.0000    1.6293    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.7835    2.2465    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    1.7559    2.0242    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    2.1897    1.1289    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.0000    0.6228    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    1.7566    0.2224    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.7835    0.0000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'  6  7  1  0     0  0\n' +
			'  5  7  1  0     0  0\n' +
			'  1  5  1  0     0  0\n' +
			'  4  6  1  0     0  0\n' +
			'  3  4  1  0     0  0\n' +
			'  2  3  1  0     0  0\n' +
			'  1  2  1  0     0  0\n' +
		'M  END\n',

	'Cyclooctane\n' +
			'  Ketcher 11161218352D 1   1.00000     0.00000     0\n' +
			'\n' +
			'  8  8  0     0  0            999 V2000\n' +
			'    0.0000    0.7053    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.0000    1.7078    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.7053    2.4131    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    0.7056    0.0000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    1.7079    0.0000    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    2.4133    0.7053    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    2.4133    1.7078    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'    1.7079    2.4131    0.0000 C   0  0  0  0  0  0        0  0  0\n' +
			'  8  3  1  0     0  0\n' +
			'  7  8  1  0     0  0\n' +
			'  6  7  1  0     0  0\n' +
			'  5  6  1  0     0  0\n' +
			'  4  5  1  0     0  0\n' +
			'  1  4  1  0     0  0\n' +
			'  2  3  1  0     0  0\n' +
			'  1  2  1  0     0  0\n' +
		'M  END\n'
].map(structStr => molfile.parse(structStr));
