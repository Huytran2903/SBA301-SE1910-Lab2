// src/components/Orchids.jsx - ASYNC VERSION with search/filter (optional extension)
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import useOrchids from '../hooks/useOrchids';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import OrchidCard from './OrchidCard';
import OrchidDetailModal from './OrchidDetailModal';

export default function Orchids() {
  const { orchids, loading, error, reload } = useOrchids();

  // Modal state
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  // Optional filter state (F13 - search/filter extension)
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('ALL');
  const [specialOnly, setSpecialOnly] = useState(false);

  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedOrchid(null);
  };

  // Derived data - no extra API call needed
  const categories = ['ALL', ...new Set(orchids.map((o) => o.category))];

  const visibleOrchids = orchids.filter((o) => {
    const matchName = o.orchidName.toLowerCase().includes(keyword.trim().toLowerCase());
    const matchCategory = category === 'ALL' || o.category === category;
    const matchSpecial = !specialOnly || o.isSpecial;
    return matchName && matchCategory && matchSpecial;
  });

  return (
    <Container id="orchids" className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Orchids List</h2>
        <Button variant="outline-primary" onClick={reload} disabled={loading}>
          Reload
        </Button>
      </div>

      {/* Search & Filter (Optional F13) */}
      <Row className="mb-3 g-2">
        <Col xs={12} md={5}>
          <Form.Control
            id="search-keyword"
            type="text"
            placeholder="Search by name..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col xs={12} md={4}>
          <Form.Select
            id="category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={3} className="d-flex align-items-center">
          <Form.Check
            id="special-only"
            type="checkbox"
            label="Special only"
            checked={specialOnly}
            onChange={(e) => setSpecialOnly(e.target.checked)}
          />
        </Col>
      </Row>

      {/* Loading state */}
      {loading && <LoadingSpinner />}

      {/* Error state */}
      {error && <ErrorMessage message={error} onRetry={reload} />}

      {/* Empty state */}
      {!loading && !error && orchids.length === 0 && (
        <p>Không có Orchid nào.</p>
      )}

      {/* Empty filtered results */}
      {!loading && !error && orchids.length > 0 && visibleOrchids.length === 0 && (
        <p>Không tìm thấy Orchid phù hợp với bộ lọc.</p>
      )}

      {/* Data state - card grid */}
      {!loading && !error && visibleOrchids.length > 0 && (
        <Row>
          {visibleOrchids.map((orchid) => (
            <Col xs={12} sm={6} lg={3} key={orchid.id} className="mb-4">
              <OrchidCard orchid={orchid} onDetail={handleShow} />
            </Col>
          ))}
        </Row>
      )}

      {/* Detail Modal */}
      <OrchidDetailModal show={show} orchid={selectedOrchid} onClose={handleClose} />
    </Container>
  );
}
